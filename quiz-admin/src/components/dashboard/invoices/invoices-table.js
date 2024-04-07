import { useEffect, useState } from "react";
import Proptypes from "prop-types";
import NextLink from "next/link";
import { format } from "date-fns";
import numeral from "numeral";
import ErrorIcon from "@mui/icons-material/Error";
import {
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
import { Pagination } from "../../pagination";
import { ResourceError } from "../../resource-error";
import { ResourceUnavailable } from "../../resource-unavailable";
import { Scrollbar } from "../../scrollbar";
import { Status } from "../../status";
import { InvoiceMenu } from "./invoice-menu";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import moment from "moment";
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const columns = [
  {
    id: "amount",
    disablePadding: true,
    label: "Amount",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "payment_method",
    label: "Payment Method",
  },

  {
    id: "trx_date",
    label: "Trx Date",
  },
];

const statusVariants = [
  {
    color: "info.main",
    label: "Ongoing",
    value: "ongoing",
  },
  {
    color: "warning.main",
    label: "Refunded",
    value: "refunded",
  },
  {
    color: "error.main",
    label: "Failed",
    value: "failed",
  },
  {
    color: "success.main",
    label: "Succeeded",
    value: "succeeded",
  },
];

export const InvoicesTable = (props) => {
  const {
    error,
    invoices: invoicesProp,
    invoicesCount,
    isLoading,
    onPageChange,
    onSelect,
    onSelectAll,
    onSortChange,
    page,
    selectedInvoices,
    sort,
    sort_by,
  } = props;
  const [invoices, setInvoices] = useState(invoicesProp);

  useEffect(() => {
    setInvoices(invoicesProp);
  }, [invoicesProp]);

  const displayLoading = isLoading;
  const displayError = Boolean(!isLoading && error);
  const displayUnavailable = Boolean(!isLoading && !error && !invoices?.length);

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
              <TableCell padding="checkbox">
                <Checkbox
                  checked={invoices.length > 0 && selectedInvoices.length === invoices.length}
                  disabled={isLoading}
                  indeterminate={
                    selectedInvoices.length > 0 && selectedInvoices.length < invoices.length
                  }
                  onChange={onSelectAll}
                />
              </TableCell>
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
            {invoices.map((invoice) => {
              const statusVariant = statusVariants.find(
                (variant) => variant.value === invoice.status
              );

              return (
                <TableRow
                  hover
                  key={invoice._id}
                  selected={
                    !!selectedInvoices.find((selectedCustomer) => selectedCustomer === invoice._id)
                  }
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={
                        !!selectedInvoices.find(
                          (selectedCustomer) => selectedCustomer === invoice._id
                        )
                      }
                      onChange={(event) => onSelect(event, invoice._id)}
                    />
                  </TableCell>
                  <TableCell>
                    ${invoice.amount} SGD
                    {/* <NextLink href="/dashboard/invoices/1" passHref>
                      <Link color="inherit" component="a" underline="none" variant="subtitle2">
                        #{invoice.id}
                      </Link>
                    </NextLink> */}
                  </TableCell>
                  <TableCell>
                    {invoice.status == "succeeded" ? (
                      <Chip
                        label={invoice.status}
                        color="success"
                        icon={<DoneIcon />}
                        variant="outlined"
                      />
                    ) : (
                      <Chip
                        label={invoice.status}
                        color="error"
                        icon={<ErrorIcon />}
                        variant="outlined"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {capitalizeFirstLetter(invoice.payment_method)}****{invoice.card_number}
                  </TableCell>

                  <TableCell>{format(new Date(invoice.trx_date * 1000), "MMM dd, yyyy, hh:mm a")}</TableCell>
                  {/* <TableCell>
                    {numeral(invoice.totalAmount).format(`${invoice.currencySymbol}0,0.00`)}
                  </TableCell> */}
                  <TableCell>
                    <InvoiceMenu />
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
        rowsCount={invoicesCount}
      />
    </Box>
  );
};

InvoicesTable.defaultProps = {
  invoices: [],
  invoicesCount: 0,
  page: 1,
  selectedInvoices: [],
  sort: "desc",
  sort_by: "issueDate",
};

InvoicesTable.propTypes = {
  invoices: Proptypes.array,
  invoicesCount: Proptypes.number,
  error: Proptypes.string,
  isLoading: Proptypes.bool,
  onPageChange: Proptypes.func,
  onSelect: Proptypes.func,
  onSelectAll: Proptypes.func,
  onSortChange: Proptypes.func,
  page: Proptypes.number,
  selectedInvoices: Proptypes.array,
  sort: Proptypes.oneOf(["asc", "desc"]),
  sort_by: Proptypes.string,
};
