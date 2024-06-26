import Head from "next/head";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import QuizCreateUpdate from "../../../../components/dashboard/quiz/create-update";

const QuizCreate = (props) => {
  return (
    <>
      <Head>
        <title>Quiz: Create | Lobang Dashboard</title>
      </Head>
      <QuizCreateUpdate />
    </>
  );
};

QuizCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default QuizCreate;
