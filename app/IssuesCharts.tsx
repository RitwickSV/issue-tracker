"use client";
import { Card } from "@radix-ui/themes";
import React from "react";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  open: number;
  in_progress: number;
  closed: number;
}

const IssuesCharts = ({ open, in_progress, closed }: Props) => {
  const data = [
    { name: "Open", value: open },
    { name: "Closed", value: closed },
    { name: "In Progress", value: in_progress },
  ];
  return (
    <Card className="max-w-2xl">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssuesCharts;
