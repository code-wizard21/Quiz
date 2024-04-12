import Proptypes from "prop-types";
import NextLink from "next/link";
import { format } from "date-fns";
import moment from 'moment-timezone';
import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  Link,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { Pagination } from "../../pagination";
import { ResourceError } from "../../resource-error";
import { ResourceUnavailable } from "../../resource-unavailable";
import { Scrollbar } from "../../scrollbar";
import { Status } from "../../status";
import { ProductMenu } from "./quiz-menu";

const columns = [
  {
    id: "description",
    label: "Description",
  },
  {
    id: "host",
    label: "Host",
  },
  {
    id: "category",
    label: "Category",
  },
  {
    id: "start_date",
    label: "Start Date",
  },
  {
    id: "status",
    label: "Status",
  },
];

const statusVariants = [
  {
    color: "info.main",
    label: "Draft",
    value: "draft",
  },
  {
    color: "success.main",
    label: "Published",
    value: "published",
  },
];

export const ProductsTable = (props) => {
  const {
    error,
    isLoading,
    onPageChange,
    onSelect,
    onSelectAll,
    onSortChange,
    page,
    products,
    productsCount,
    selectedProducts,
    sort,
    sort_by,
    updateList,
  } = props;

  const displayLoading = isLoading;
  const displayError = Boolean(!isLoading && error);
  const displayUnavailable = Boolean(!isLoading && !error && !products.length);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <Scrollbar>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <TableSortLabel
                    active={sort_by === column.id}
                    direction={sort_by === column.id ? sort : "asc"}
                    disabled={isLoading}
                    onClick={(event) => onSortChange(event, column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              return (
                <NextLink href={"quizzes/" + product.id} key={product.id}>
                  <TableRow
                    hover
                    key={product.id}
                    selected={
                      !!selectedProducts.find((selectedCustomer) => selectedCustomer === product.id)
                    }
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Box sx={{ ml: 2 }}>{product.description}</Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                  
                        {/* <Box sx={{ ml: 2 }}>{product.user.name}</Box> */}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {product.category && (
                        <div>
                          <Typography color="inherit" variant="body2">
                            {product.category.name}
                          </Typography>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {product.start_date && (
                        <div>
                          <Typography color="inherit" variant="body2">
                            { moment(product.start_date).format('MMM DD, YYYY, hh:mm a')}
                          </Typography>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>{product.status}</div>
                    </TableCell>
                    <TableCell align="right">
                      <ProductMenu product={product} updateList={updateList} />
                    </TableCell>
                  </TableRow>
                </NextLink>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      {displayLoading && (
        <Box sx={{ p: 2 }}>
          <Skeleton height={42} />
          <Skeleton height={42} />
          <Skeleton height={42} />
        </Box>
      )}
      {displayError && (
        <ResourceError
          error={error}
          sx={{
            flexGrow: 1,
            m: 2,
          }}
        />
      )}
      {displayUnavailable && (
        <ResourceUnavailable
          sx={{
            flexGrow: 1,
            m: 2,
          }}
        />
      )}
      <Divider sx={{ mt: "auto" }} />
      <Pagination
        disabled={isLoading}
        onPageChange={onPageChange}
        page={page}
        rowsCount={productsCount}
      />
    </Box>
  );
};

ProductsTable.defaultProps = {
  page: 1,
  products: [],
  productsCount: 0,
  selectedProducts: [],
  sort: "desc",
  sort_by: "createdAt",
};

ProductsTable.propTypes = {
  error: Proptypes.string,
  isLoading: Proptypes.bool,
  onPageChange: Proptypes.func,
  onSelect: Proptypes.func,
  onSelectAll: Proptypes.func,
  onSortChange: Proptypes.func,
  page: Proptypes.number,
  products: Proptypes.array,
  productsCount: Proptypes.number,
  selectedProducts: Proptypes.array,
  sort: Proptypes.oneOf(["asc", "desc"]),
  sort_by: Proptypes.string,
};
