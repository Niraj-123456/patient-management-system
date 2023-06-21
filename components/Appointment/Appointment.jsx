import React from "react";
import styles from "./appointment.module.css";

import { Formik, Field, Form } from "formik";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { formatyyyyMMdd } from "../../utils/dateFormat";

const groups = [
  { label: "O.P.D", value: "O.P.D" },
  { label: "Child HealthCare", value: "child_healthcare" },
  { label: "Female HealthCare", value: "female_healthcare" },
  { label: "Sexologist", value: "sexologist" },
  { label: "Mental HealthCare", value: "mental_healthcare" },
];

const Appointment = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Book An Appointment</h1>
        <Formik
          initialValues={{
            department: "O.P.D",
            appointmentDate: formatyyyyMMdd(new Date()),
          }}
        >
          {({ values, errors, touched, dirty }) => (
            <Form className={styles.appointment__form}>
              <Field name="department">
                {({ field }) => (
                  <TextField
                    select
                    {...field}
                    id="department"
                    label="Select Department"
                    size="small"
                    sx={{ width: 250 }}
                  >
                    {groups?.map((group) => (
                      <MenuItem
                        key={group?.value}
                        value={group?.value}
                        sx={{ fontSize: "14px" }}
                      >
                        {group?.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Field>
              <Field name="appointmentDate">
                {({ field }) => (
                  <TextField
                    type="date"
                    {...field}
                    size="small"
                    label="Select a date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              </Field>

              <Box display={"flex"} gap={1}>
                <Button variant="contained" fullWidth>
                  Book
                </Button>
                <Button variant="outlined" fullWidth>
                  Cancel
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Appointment;
