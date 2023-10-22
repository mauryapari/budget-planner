"use client"

import { formattedTransaction } from "@/types/accountsType"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<formattedTransaction>[] = [
  {
    accessorKey: "transactionDate",
    header: "Transaction Date",
  },
  {
    accessorKey: "transaction",
    header: "Transaction Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "transactionType",
    header: "Type",
  },
]
