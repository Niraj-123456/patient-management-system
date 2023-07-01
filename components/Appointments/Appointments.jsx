import React from "react";
import styles from "./appointments.module.css";
import { Button } from "@mui/material";

const Appointments = ({ appointments }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>UpComing Appointments</h1>
        <div className={styles.appointments__wrapper}>
          {appointments?.length > 0 ? (
            appointments?.map((appointment) => (
              <div key={appointment?.id} className={styles.appointment}>
                <div className={styles.appointment__date__time}>
                  <div className={styles.appointment__date}>
                    {appointment?.appointmentDate}
                  </div>
                  <div className={styles.appointment__time}>
                    {appointment?.appointmentTime}
                  </div>
                </div>
                <div className={styles.appointment__info}>
                  <p>{appointment?.hospital.split("_").join(" ")}</p>
                  <p>{appointment?.department}</p>
                  <p>Dr. XYZ</p>
                </div>
                <div>
                  <Button variant="outlined" size="small">
                    Reschedule
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p style={{ fontSize: 14, color: "#777" }}>
                You don&apos;t have any upcoming appointments.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
