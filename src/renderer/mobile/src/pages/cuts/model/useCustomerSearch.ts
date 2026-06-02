import { useState } from "react";

import { DUMMY_CUSTOMERS } from "@/features/cuts/constrants/customers";
import type { Customer } from "@/features/cuts/model/types/Customer.types";

export const useCustomerSearch = () => {
  const [query, setQuery] = useState("");

  const filtered: Customer[] = DUMMY_CUSTOMERS.filter((c) =>
    c.name.includes(query.trim())
  );

  return { query, setQuery, filtered };
};