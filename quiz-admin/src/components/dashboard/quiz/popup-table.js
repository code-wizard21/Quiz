import Proptypes from "prop-types";
import NextLink from "next/link";
import { format } from "date-fns";
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
import { ProductMenu } from "./quiz-menu";
import { PopupMenu } from "./popup-menu";

const columns = [
  {
    id: "image",
    label: "image",
  },
  {
    id: "header",
    label: "Header",
  },
  {
    id: "body",
    label: "Body",
  },
  {
    id: "cta",
    label: "CTA Text",
  },
  {
    id: "ctaAction",
    label: "CTA Action",
  },
  {
    id: "secondaryCta",
    label: "Secondary CTA Text",
  },
  {
    id: "secondaryCatAction",
    label: "secondary CTA Action",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "frequency",
    label: "Frequency",
  },
  {
    id: "delay",
    label: "Delay",
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
    onSortChange,
    page,
    products,
    productsCount,
    selectedProducts,
    sort,
    sort_by,
    updateList,
    handleEdit
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
                <TableRow
                  hover
                  key={product.id}
                  selected={
                    !!selectedProducts.find((selectedCustomer) => selectedCustomer === product.id)
                  }
                  onClick={() => {
                    handleEdit(product.id)
                  }}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar
                        alt={product.image}
                        src={product.image}
                        sx={{
                          width: 64,
                          height: 64,
                        }}
                        variant="rounded"
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Box sx={{ ml: 2 }}>{product.header}</Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Box sx={{ ml: 2 }}>{product.body}</Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Box sx={{ ml: 2 }}>{product.cta}</Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Box sx={{ ml: 2 }}>{product.ctaAction}</Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Box sx={{ ml: 2 }}>{product.secondaryCta}</Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Box sx={{ ml: 2 }}>{product.secondaryCtaAction}</Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <div>{product.status ? "Active" : "Inactive"}</div>
                  </TableCell>
                  <TableCell>
                    <div>{product.frequency === 1 ? "One-Time" : "Recurring"}</div>
                  </TableCell>
                  <TableCell>
                    <div>{product.delay}</div>
                  </TableCell>
                  <TableCell align="right">
                    <PopupMenu product={product} updateList={updateList} handleEdit={handleEdit} />
                  </TableCell>
                </TableRow>
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
