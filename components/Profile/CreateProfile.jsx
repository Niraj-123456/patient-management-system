import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./profile.module.css";
import { Field, Form, Formik } from "formik";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const ageRanges = [
  { label: "New Born", value: "new_born" },
  { label: "Under 5", value: "under_five" },
  { label: "Between 5 To 12", value: "between_five_twelve" },
  { label: "Teenage", value: "teenage" },
  { label: "Above 20", value: "above_twenty" },
  { label: "Above 35", value: "above_thirtyFive" },
  { label: "Above 55", value: "above_fiftyFive" },
];

const CreateProfile = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const session = useSession();
  const { data } = session;
  const user = data?.user;

  const handleCreateProfile = (data) => {
    setSubmitting(true);
    fetch("/api/profile/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        setSubmitting(false);
        router.push(`/profile/${user?.id}`);
        toast.success("Profile created successfully");
      })
      .catch((err) => {
        setSubmitting(false);
        toast.error("Something went wrong");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Create A Profile</h1>
        <Formik
          initialValues={{
            name: "",
            address: "",
            ageRange: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleCreateProfile(values);
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, dirty, isValid, isSubmitting }) => (
            <Form className={styles.create__profile__form}>
              <Field name="name">
                {({ field }) => (
                  <TextField {...field} label="Name" size="small" />
                )}
              </Field>
              <Field name="address">
                {({ field }) => (
                  <TextField {...field} label="Address" size="small" />
                )}
              </Field>
              <Field name="ageRange">
                {({ field }) => (
                  <TextField select {...field} label="Age Range" size="small">
                    {ageRanges?.map((ageRange) => (
                      <MenuItem key={ageRange?.value} value={ageRange?.value}>
                        {ageRange?.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Field>

              <Box display={"flex"} gap={1}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size={"small"}
                  endIcon={
                    submitting ? (
                      <CircularProgress size={15} thickness={3} />
                    ) : (
                      ""
                    )
                  }
                  disabled={isSubmitting || !dirty || !isValid || submitting}
                >
                  Create
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => router(-1)}
                  fullWidth
                  size={"small"}
                  disabled={isSubmitting || !dirty || !isValid || submitting}
                >
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

export default CreateProfile;
