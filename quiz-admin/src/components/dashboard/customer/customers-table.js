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
} from "@mui/material";
import { format } from "date-fns";
import NextLink from "next/link";
import Proptypes from "prop-types";
import { useEffect, useState } from "react";
import { Pagination } from "../../pagination";
import { ResourceError } from "../../resource-error";
import { ResourceUnavailable } from "../../resource-unavailable";
import { Scrollbar } from "../../scrollbar";
import { CustomerMenu } from "./customer-menu";

const columns = [
  {
    id: "fullName",
    disablePadding: true,
    label: "Name",
  },
  {
    id: "phone",
    label: "Phone",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "createdAt",
    label: "Joined",
  },
];

export const CustomersTable = (props) => {
  const {
    customers: customersProp,
    customersCount,
    error,
    isLoading,
    onPageChange,
    onSelect,

    onSortChange,
    page,
    selectedCustomers,
    sort,
    sort_by,
    updateList,
  } = props;
  const [customers, setCustomers] = useState(customersProp);

  useEffect(() => {
    setCustomers(customersProp);
  }, [customersProp]);



  const displayLoading = isLoading;
  const displayError = Boolean(!isLoading && error);
  const displayUnavailable = Boolean(!isLoading && !error && !customers?.length);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <Scrollbar>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell />
              {columns.map((column) => (
                <TableCell key={column.id} padding={column.disablePadding ? "none" : "normal"}>
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
            {customers?.map((customer) => (
              <TableRow
                hover
                key={customer.id}
                selected={
                  !!selectedCustomers.find((selectedCustomer) => selectedCustomer === customer.id)
                }
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={
                      !!selectedCustomers.find(
                        (selectedCustomer) => selectedCustomer === customer.id
                      )
                    }
                    onChange={(event) => onSelect(event, customer.id)}
                  />
                </TableCell>
                <TableCell padding="none">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
            
                  </Box>
                </TableCell>
                <TableCell padding="none">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={customer.profilePic}
                      sx={{
                        height: 36,
                        mr: 1,
                        width: 36,
                      }}
                      variant="rounded"
                    >
                      {customer.name?.charAt(0) || "S"}
                    </Avatar>
                    <NextLink href={`/dashboard/users/${customer?.id}`} passHref>
                      <Link color="inherit" component="a" underline="none" variant="subtitle2">
                        {customer?.name || "Shadow"}
                      </Link>
                    </NextLink>
                  </Box>
                </TableCell>
                <TableCell>{customer.mobile}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{format(new Date(customer.createdAt), "MMM dd, yyyy, hh:mm a")}</TableCell>
                <TableCell align="right">
                  <CustomerMenu updateList={updateList} customer={customer} />
                </TableCell>
              </TableRow>
            ))}
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
        rowsCount={customersCount}
      />
    </Box>
  );
};

CustomersTable.defaultProps = {
  customers: [],
  customersCount: 0,
  page: 1,
  selectedCustomers: [],
  sort: "desc",
  sort_by: "createdAt",
};

CustomersTable.propTypes = {
  customers: Proptypes.array,
  customersCount: Proptypes.number,
  error: Proptypes.string,
  isLoading: Proptypes.bool,
  onPageChange: Proptypes.func,
  onSelect: Proptypes.func,
  onSelectAll: Proptypes.func,
  onSortChange: Proptypes.func,
  page: Proptypes.number,
  selectedCustomers: Proptypes.array,
  sort: Proptypes.oneOf(["asc", "desc"]),
  sort_by: Proptypes.string,
};
