import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./appointment.module.css";

import { Formik, Field, Form } from "formik";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import { formatyyyyMMdd } from "../../utils/dateFormat";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const hospitals = [
  { label: "Teaching Hospital", value: "teaching_hospital" },
  { label: "Bir Hospital", value: "bir_hospital" },
  { label: "Civil Service Hospital of Nepal", value: "civil_hospital" },
  { label: "Grande City Hospital", value: "grande_hospital" },
  { label: "Kathmandu Hospital", value: "kathmandu_hospital" },
];

const groups = [
  { label: "O.P.D", value: "O.P.D" },
  { label: "Child HealthCare", value: "child_healthcare" },
  { label: "Female HealthCare", value: "female_healthcare" },
  { label: "Sexologist", value: "sexologist" },
  { label: "Mental HealthCare", value: "mental_healthcare" },
];

const Appointment = () => {
  const router = useRouter();
  const session = useSession();
  const { data, status } = session;
  const user = data?.user;
  const [booking, setBooking] = useState(false);

  const handleBookAppointment = async (data) => {
    setBooking(true);
    await fetch("/api/appointments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res?.status === 200) {
          console.log("res", res);
          setBooking(false);
          router.push(`/appointments/${user?.id}`);
          toast.success("Appointment booked successfully");
        } else {
          setBooking(false);
          toast.error("Something went wrong.");
        }
      })
      .catch((err) => {
        console.log("err", err);
        setBooking(false);
        toast.error("Something went wrong.");
      });
  };

  useEffect(() => {
    if (!user || status === "unauthenticated") router.push("/");
  }, [user, router, status]);

  return (
    user && (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Book An Appointment</h1>
          <Formik
            initialValues={{
              hospital: "",
              department: "O.P.D",
              appointmentDate: formatyyyyMMdd(new Date()),
              appointmentTime: "07:30",
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleBookAppointment(values);
              setSubmitting(false);
            }}
          >
            {({ values, errors, touched, dirty, isValid, isSubmitting }) => (
              <Form className={styles.appointment__form}>
                <Field name="hospital">
                  {({ field }) => (
                    <TextField
                      select
                      {...field}
                      id="hospital"
                      label="Select Hospital"
                      size="small"
                      sx={{ width: 250 }}
                    >
                      {hospitals?.map((hospital) => (
                        <MenuItem
                          key={hospital?.value}
                          value={hospital?.value}
                          sx={{ fontSize: "14px" }}
                        >
                          {hospital?.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </Field>
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
                <Field name="appointmentTime">
                  {({ field }) => (
                    <TextField
                      type="time"
                      {...field}
                      size="small"
                      label="Select a time"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                </Field>

                <Box display={"flex"} gap={1}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    endIcon={
                      booking ? (
                        <CircularProgress size={15} thickness={3} />
                      ) : (
                        ""
                      )
                    }
                    disabled={isSubmitting || !dirty || !isValid || booking}
                  >
                    Book
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    disabled={isSubmitting || !dirty || !isValid || booking}
                    onClick={() => router.push(-1)}
                  >
                    Cancel
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  );
};

export default Appointment;
