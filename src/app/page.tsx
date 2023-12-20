"use client";

import { useQuery } from "@tanstack/react-query";

import FullPageSpinner from "@/app/full-page-spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      return new Promise((resolve) => setTimeout(resolve, 100)).then(() => [
        {
          id: "EXP001",
          description: "Business lunch",
          date: "2023-12-15",
          amount: "$45.00",
          paymentMethod: "Credit Card",
          status: "Pending",
        },
        {
          id: "EXP002",
          description: "Flight tickets",
          date: "2023-12-10",
          amount: "$250.00",
          paymentMethod: "Debit Card",
          status: "Reimbursed",
        },
      ]);
    },
  });

  if (isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <main className="min-h-screen p-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map(({ id, description, date, amount, paymentMethod, status }) => (
            <ExpenseRow
              key={id}
              id={id}
              description={description}
              date={date}
              amount={amount}
              paymentMethod={paymentMethod}
              status={status}
            />
          ))}
          <NewRow />
        </TableBody>
      </Table>
    </main>
  );
}

function NewRow() {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Input className="w-full" placeholder="EXP003" />
      </TableCell>
      <TableCell>
        <Input className="w-full" placeholder="Description" />
      </TableCell>
      <TableCell>
        <Input className="w-full" type="date" />
      </TableCell>
      <TableCell>
        <Input className="w-full" step="0.01" type="number" />
      </TableCell>
      <TableCell>
        <div className="relative inline-block text-left w-full">
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Payment Method</SelectLabel>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="debit-card">Debit Card</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={"default"}>-</Badge>
      </TableCell>
      <TableCell className="flex items-center justify-center">
        <Button size="sm" variant="outline">
          Add
        </Button>
      </TableCell>
    </TableRow>
  );
}

function ExpenseRow({
  id,
  description,
  date,
  amount,
  paymentMethod,
  status,
}: {
  id: string;
  description: string;
  date: string;
  amount: string;
  paymentMethod: string;
  status: string;
}) {
  return (
    <TableRow>
      <TableCell className="font-medium">{id}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>{amount}</TableCell>
      <TableCell>{paymentMethod}</TableCell>
      <TableCell>
        <Badge variant={status == "Pending" ? "default" : "secondary"}>{status}</Badge>
      </TableCell>
      <TableCell>
        <Button variant="ghost">Edit</Button>
      </TableCell>
    </TableRow>
  );
}
