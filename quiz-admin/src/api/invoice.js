import React, { useState, useEffect } from "react";
import { subDays, subMinutes } from "date-fns";
import { throttle } from "../config";
import { applyFilters } from "../utils/apply-filters";
import { applyPagination } from "../utils/apply-pagination";
import { applySort } from "../utils/apply-sort";
import { wait } from "../utils/wait";
import axiosClient from "../api/axiosinstance";
import { element } from "prop-types";

const now = new Date();

class InvoiceApi {
  async getInvoices(options) {
    if (throttle) {
      await wait(throttle);
    }
    const res = await axiosClient.get("/payment/history");
    const invoices = [];

    await res.data.data.forEach((element, idx) => {
      invoices.push({
        id: idx + 1,
        amount: element.amount / 100,
        status: element.status,
        payment_method: element.payment_method_details.card.brand,
        card_number:element.payment_method_details.card.last4,
        trx_date: element.created,
      });
    });

    const { filters, sort, sort_by, page, query, view } = options;

    /*
     NOTE: Query, filter, sort and pagination are operation meant to be executed on the server.
     Since this does not connect to a real backend, we simulate these operations.
     */
    console.log("query", query);
    const queriedInvoices = invoices.filter((_invoice) => {
      // If query exists, it looks only in customer id field
      if (!!query && !_invoice.payment_method?.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      // No need to look for any resource fields
      if (typeof view === "undefined" || view === "all") {
        return true;
      }

      // In this case, the view represents the resource status
      return _invoice.status === view;
    });
    console.log("queriedInvoices", queriedInvoices);
    const filteredInvoices = applyFilters(queriedInvoices, filters);
    console.log("filteredInvoices", filteredInvoices);
    const sortedInvoices = applySort(filteredInvoices, sort, sort_by);
    console.log("sortedInvoices", sortedInvoices);
    const paginatedInvoices = applyPagination(sortedInvoices, page);
    console.log("paginatedInvoices", paginatedInvoices);
    return Promise.resolve({
      invoices: paginatedInvoices,
      invoicesCount: filteredInvoices.length,
    });
  }
  async getSearchInvoices(e) {
    if (throttle) {
      await wait(throttle);
    }
    const res = await axiosClient.get("/payment/history");
    const invoices = [];

    await res.data.data.forEach((element, idx) => {

      invoices.push({
        id: idx + 1,
        amount: element.amount / 100,
        status: element.status,
        payment_method: element.payment_method_details.card.brand,

        trx_date: element.created,
      });
    });
    // console.log('invoesesese',invoices,searchInput);
    const invoicesResult = [];
   
    let int = parseInt(e.searchInput);
    await invoices.forEach((element,idx) => {
      console.log('element',element);
      if(element.amount==int){
        invoicesResult.push({
          id: idx + 1,
          amount: element.amount / 100,
          status: element.status,
          payment_method: element.payment_method,
  
          trx_date: element.created,
        })
      }
      console.log(element.amount);
    });
    console.log('invoicesResult',invoicesResult);
    
    return Promise.resolve({
      invoices: invoicesResult,
      invoicesCount: invoicesResult.length,
    });
  }
  async getInvoice() {
    if (throttle) {
      await wait(throttle);
    }

    return Promise.resolve(invoice);
  }
}

export const invoiceApi = new InvoiceApi();
