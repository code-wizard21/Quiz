import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  Typography,
} from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import axiosClient from "../../../api/axiosinstance";
import { AutocompleteField } from "../../../components/autocomplete-field";
import { DateField } from "../../../components/date-field";
import { InputField } from "../../../components/input-field";
import { ArrowLeft as ArrowLeftIcon } from "../../../icons/arrow-left";
import { Plus as PlusIcon } from "../../../icons/plus";
import { Trash as TrashIcon } from "../../../icons/trash";

const availableStatus = [
  { label: "ACTIVE", value: "active" },
  { label: "INACTIVE", value: "inactive" },
  { label: "COMPLETED", value: "completed" },
  { label: "CANCELLED", value: "cancelled" },
  { label: "VOTING", value: "voting" },
];

const QuizCreateUpdate = (props) => {
  const { quizId } = props;
  const router = useRouter();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: "",
      host: "",
      category: "",
      startDate: null,
      status: "",
      description: "",
      questions: [
        {
          text: "",
          options: [
            {
              text: "",
              isCorrect: false,
            },
          ],
        },
      ],
      isPaid: false,
    },
    validationSchema: Yup.object().shape({
      host: Yup.object().required("Host is required"),
      category: Yup.object().required("category is required"),
      startDate: Yup.date().required("Start date is required"),
      status: Yup.object().required("Status is required"),
      description: Yup.string().required("Description is required"),
      questions: Yup.array().of(
        Yup.object().shape({
          text: Yup.string().required("Text is required"),
          options: Yup.array().of(
            Yup.object().shape({
              text: Yup.string().required("Option is required"),
              isCorrect: Yup.boolean().required("Correct option is required"),
            })
          ),
        })
      ),
      isPaid: Yup.boolean().required("Paid is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const toastText = quizId ? "Updating..." : "Creating...";
        toast.loading(toastText);
        setIsProcessing(true);
        if (quizId) {
          await updateQuiz(quizId);
        } else {
          await saveQuiz(values);
        }
        helpers.setStatus({ success: true });
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
      } finally {
        toast.dismiss();
        setIsProcessing(false);
        helpers.setSubmitting(false);
      }
    },
  });

  const [hostList, setHostList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [removedQuestions, setRemovedQuestions] = useState([]);
  const [removedOptions, setRemovedOptions] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const getQuizById = useCallback(async () => {
    const result = await axiosClient.get("quizes/all?_id=" + quizId);
    const quiz = result?.data?.data?.results[0];
    formik.setValues({
      ...formik.values,
      id: quiz._id,
      host: {
        _id: quiz.host._id,
        value: quiz.host._id,
        label: quiz.host.name,
      },
      category: {
        _id: quiz?.category?._id,
        value: quiz?.category?._id,
        label: quiz?.category?.name,
      },
      startDate: new Date(quiz.start_date),
      status: {
        value: quiz.status,
        label: quiz.status.toUpperCase(),
      },
      description: quiz.description,
      questions: quiz.questions.map((item) => {
        return {
          _id: item._id,
          text: item.text,
          options: item.options.map((option) => {
            return {
              _id: option._id,
              text: option.text,
              isCorrect: option.is_correct,
            };
          }),
        };
      }),
      isPaid: quiz.is_paid,
    });
  }, []);

  const updateQuiz = async (quizId) => {
    toast.loading("Updating...");
    axiosClient
      .patch("/quizes/" + quizId, {
        host: formik.values.host.value,
        category: formik.values.category.value,
        start_date: formik.values.startDate,
        status: formik.values.status.value,
        description: formik.values.description,
        questions: formik.values.questions.map((item) => {
          return {
            _id: item._id,
            text: item.text,
            options: item.options.map((option) => {
              return {
                _id: option._id,
                text: option.text,
                is_correct: option.isCorrect,
              };
            }),
          };
        }),
        is_paid: formik.values.isPaid,
        removed_questions: removedQuestions,
        removed_options: removedOptions,
      })
      .then((response) => {
        toast.success("Quiz updated");
        // redirect to quiz list /quizzes
        router.push("/dashboard/quizzes");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      })
      .finally(() => {
        toast.dismiss();
      });
  };

  const saveQuiz = async (values) => {
    axiosClient
      .post("/quizes", {
        host: values.host.value,
        category: values.category.value,
        start_date: values.startDate,
        status: values.status.value,
        description: values.description,
        questions: values.questions.map((item) => {
          return {
            text: item.text,
            options: item.options.map((option) => {
              return {
                text: option.text,
                is_correct: option.isCorrect,
              };
            }),
          };
        }),
        is_paid: values.isPaid,
      })
      .then((response) => {
        toast.success("Quiz created");
        // redirect to quiz list /quizzes
        router.push("/dashboard/quizzes");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  };

  const getAllCategories = useCallback(async () => {
    axiosClient
      .get("/categories")
      .then((response) => {
        if (response?.data?.data?.results) {
          const data = response?.data?.data?.results?.map((item) => {
            return {
              value: item.id,
              label: item.name,
            };
          });
          setCategoryList(data);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  }, []);

  const checkAndUpdateRadioButton = (event, index, optionIndex) => {
    formik.setFieldValue(
      `questions[${index}].options`,
      formik.values.questions[index].options.map((item, itemIndex) => {
        if (itemIndex !== optionIndex) {
          return {
            ...item,
            isCorrect: false,
          };
        } else {
          return {
            ...item,
            isCorrect: event.target.checked,
          };
        }
      })
    );
  };

  const getAllHost = async () => {
    axiosClient
      .get("/users?role=host")
      .then((response) => {
        if (response?.data?.data?.results) {
          const data = response?.data?.data?.results?.map((item) => {
            return {
              value: item.id,
              label: item.name,
            };
          });
          setHostList(data);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  useEffect(async () => {
    try {
      getAllCategories();
      getAllHost();
      getQuizById();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleAddQuestion = () => {
    formik.setFieldValue("questions", [
      ...formik.values.questions,
      {
        text: "",
        options: [
          {
            text: "",
            isCorrect: false,
          },
        ],
      },
    ]);
  };

  const handleUpdateQuizDescription = (event) => {
    formik.setFieldValue("description", event.target.value);
  };

  const handleUpdateQuizQuestion = (event, questionIndex) => {
    formik.setFieldValue(`questions[${questionIndex}].text`, event.target.value);
  };

  const handleDeleteQuestion = useCallback(
    (questionIndex) => {
      if (formik.values.questions.length > 1) {
        formik.setFieldValue(
          "questions",
          formik.values.questions.filter((item, index) => index !== questionIndex)
        );

        if (formik.values.questions[questionIndex]._id) {
          setRemovedQuestions([...removedQuestions, formik.values.questions[questionIndex]._id]);
        }
      }
    },
    [formik.values.questions]
  );

  const handleAddOption = (itemIndex) => {
    formik.setFieldValue(`questions[${itemIndex}].options`, [
      ...formik.values.questions[itemIndex].options,
      {
        text: "",
        isCorrect: false,
      },
    ]);
  };

  const handleDeleteOption = (questionIndex, optionIndex) => {
    if (formik.values.questions[questionIndex].options.length > 1) {
      formik.setFieldValue(
        `questions[${questionIndex}].options`,
        formik.values.questions[questionIndex].options.filter(
          (item, index) => index !== optionIndex
        )
      );

      if (formik.values.questions[questionIndex].options[optionIndex]._id) {
        setRemovedOptions([
          ...removedOptions,
          formik.values.questions[questionIndex].options[optionIndex]._id,
        ]);
      }
    }
  };

  const getItemError = (index, property) =>
    formik?.touched?.questions &&
    formik?.errors?.questions &&
    formik?.touched?.questions[index]?.[property] &&
    formik?.errors?.questions[index]?.[property];

  return (
    <>
      <Head>
        <title>{`Quiz: ${quizId ? "Update" : "Create"} | Lobang Dashboard`}</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.default",
          flexGrow: 1,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ py: 4 }}>
            <Box sx={{ mb: 2 }}>
              <NextLink href="/dashboard/quizzes" passHref>
                <Button color="primary" component="a" startIcon={<ArrowLeftIcon />} variant="text">
                  Quizes
                </Button>
              </NextLink>
            </Box>
            <Typography color="textPrimary" variant="h4">
              {quizId ? "Update" : "Create"} Quiz
            </Typography>
          </Box>
          <Card>
            <CardContent>
              <FormikProvider value={formik}>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <AutocompleteField
                      isOptionEqualToValue={(option, value) => option.value === value.value}
                      error={Boolean(formik.touched.host && formik.errors.host)}
                      filterSelectedOptions
                      fullWidth
                      label="Host"
                      helperText={formik.touched.host && formik.errors.host}
                      name="host"
                      value={formik.values.host}
                      onChange={(e, newValue) => {
                        formik.setValues({
                          ...formik.values,
                          host: newValue,
                        });
                      }}
                      options={hostList}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <AutocompleteField
                      isOptionEqualToValue={(option, value) => option.value === value.value}
                      error={Boolean(formik.touched.category && formik.errors.category)}
                      filterSelectedOptions
                      fullWidth
                      label="Category"
                      name="category"
                      helperText={formik.touched.category && formik.errors.category}
                      value={formik.values.category}
                      onBlur={formik.handleBlur}
                      onChange={(e, newValue) => {
                        formik.setValues({
                          ...formik.values,
                          category: newValue,
                        });
                      }}
                      options={categoryList}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DateField
                      error={Boolean(formik.touched.startDate && formik.errors.startDate)}
                      fullWidth
                      helperText={formik.touched.startDate && formik.errors.startDate}
                      label="Date of Stream"
                      name="startDate"
                      onChange={(date) => formik.setFieldValue("startDate", date)}
                      value={formik.values.startDate}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <AutocompleteField
                      isOptionEqualToValue={(option, value) => option.value === value.value}
                      filterSelectedOptions
                      fullWidth
                      label="Status"
                      name="status"
                      value={formik.values.status}
                      onChange={(e, newValue) => {
                        formik.setValues({
                          ...formik.values,
                          status: newValue,
                        });
                      }}
                      options={availableStatus}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      error={Boolean(formik.touched.description && formik.errors.description)}
                      fullWidth
                      helperText={formik.touched.description && formik.errors.description}
                      label="Description"
                      multiline
                      rows={4}
                      name="description"
                      onBlur={formik.handleBlur}
                      onChange={handleUpdateQuizDescription}
                      value={formik.values.description}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  {formik.values.questions.map((item, index) => {
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <Fragment key={index}>
                        <Grid item md={11} xs={11}>
                          <InputField
                            error={Boolean(getItemError(index, "text"))}
                            fullWidth
                            helperText={getItemError(index, "text")}
                            label={`Question ${index + 1}`}
                            name={`questions[${index}].text`}
                            onBlur={formik.handleBlur}
                            onChange={(event) => handleUpdateQuizQuestion(event, index)}
                            placeholder="Enter question"
                            value={item.text}
                            key={`question-${index}`}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              ml: 2,
                              mt: 3,
                            }}
                          >
                            <IconButton
                              color="warning"
                              onClick={() => handleDeleteQuestion(index)}
                              type="button"
                            >
                              <TrashIcon />
                            </IconButton>
                          </Box>
                        </Grid>
                        <Grid item md={12} xs={12} sx={{ display: "flex" }}>
                          {
                            <Grid container spacing={2}>
                              {item.options.map((option, optionIndex) => {
                                return (
                                  <Fragment key={`option-${optionIndex}`}>
                                    <Grid item xs={9}>
                                      <InputField
                                        key={`option-input-${optionIndex}`}
                                        error={Boolean(getItemError(index, "text"))}
                                        fullWidth
                                        helperText={getItemError(index, "text")}
                                        label={`Option ${optionIndex + 1}`}
                                        name={`questions[${index}].options[${optionIndex}].text`}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        placeholder="Enter option"
                                        value={option.text}
                                      />
                                    </Grid>
                                    <Grid item xs={2}>
                                      <FormControlLabel
                                        sx={{
                                          ml: 2,
                                          mt: 3,
                                        }}
                                        control={
                                          <Radio
                                            name="isCorrect"
                                            checked={option.isCorrect}
                                            onChange={(event) =>
                                              checkAndUpdateRadioButton(event, index, optionIndex)
                                            }
                                          />
                                        }
                                        label="Correct"
                                      />
                                    </Grid>
                                    <Grid item xs={1}>
                                      <Box
                                        sx={{
                                          ml: 2,
                                          mt: 3,
                                        }}
                                      >
                                        <IconButton
                                          color="primary"
                                          onClick={() => handleDeleteOption(index, optionIndex)}
                                          type="button"
                                        >
                                          <TrashIcon />
                                        </IconButton>
                                      </Box>
                                    </Grid>
                                  </Fragment>
                                );
                              })}
                            </Grid>
                          }
                          <Box
                            sx={{
                              mt: 3,
                            }}
                          >
                            <IconButton
                              color="primary"
                              onClick={() => handleAddOption(index)}
                              type="button"
                            >
                              <PlusIcon />
                            </IconButton>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider />
                        </Grid>
                      </Fragment>
                    );
                  })}
                  <Grid
                    item
                    xs={12}
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Button
                      color="primary"
                      onClick={handleAddQuestion}
                      startIcon={<PlusIcon fontSize="small" />}
                      variant="text"
                    >
                      Add Question
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formik.values.isPaid}
                          onChange={(event) => formik.setFieldValue("isPaid", event.target.checked)}
                        />
                      }
                      label="Paid"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>
              </FormikProvider>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                color="primary"
                type="submit"
                variant="contained"
                onClick={() => {
                  formik.handleSubmit();
                }}
                disabled={isProcessing}
              >
                {{ quizId } ? "Update" : "Create"}
              </Button>
            </CardActions>
          </Card>
        </Container>
      </Box>
    </>
  );
};
export default QuizCreateUpdate;