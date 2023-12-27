import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { currencies } from "../../utils";

export default function PurchaseRequistionForm() {
    const [purchase, setPurchase] = React.useState({
        name: "",
        des: "",
        curr: "",
        amount: "",
        req_no: "",
        purpose: "",
        email: "",
        date: "",
        attach: ""
    });
    const handleChange = async (event) => {

        setPurchase((prevPurchase) => ({
            ...prevPurchase,
            [event.target.name]: event.target.value
        }));
        console.log(purchase, "purchase");
    };


    return (
        <React.Fragment>
            <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
                <Box sx={{ padding: 5 }}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} sm={5}>
                            <InputLabel
                                required
                                sx={{
                                    display: "flex",
                                    justifyContent: "left",
                                    fontWeight: 500,
                                    color: "red"
                                }}
                            >
                                Name of Requistionery
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <TextField
                                required
                                id="title"
                                name="name"
                                value={purchase.name}
                                onChange={handleChange}
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} sm={5}>
                            <InputLabel
                                sx={{
                                    display: "flex",
                                    justifyContent: "left",
                                    fontWeight: 700
                                }}
                            >
                                Descriptions of the
                                Requirement
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <TextField
                                required
                                id="artist"
                                name="des"
                                value={purchase.des}
                                onChange={handleChange}
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} sm={5}>
                            <InputLabel
                                sx={{
                                    display: "flex",
                                    justifyContent: "left",
                                    fontWeight: 700
                                }}
                            >
                                Estimate Amount
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                name="curr"
                                size="small"
                                value={purchase.curr}
                                onChange={handleChange}
                                defaultValue="EUR"

                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}

                            </TextField>
                            <TextField
                                required
                                id="artist"
                                name="amount"
                                value={purchase.amount}
                                onChange={handleChange}
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <InputLabel
                                required
                                sx={{
                                    display: "flex",
                                    justifyContent: "left",
                                    fontWeight: 700
                                }}
                            >
                                Requistion No
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <TextField
                                required
                                id="artist"
                                name="req_no"
                                value={purchase.req_no}
                                onChange={handleChange}
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <InputLabel
                                required
                                sx={{
                                    display: "flex",
                                    justifyContent: "left",
                                    fontWeight: 500,
                                    color: "red"
                                }}
                            >
                                Purpose of Requistion
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <TextField
                                required
                                id="artist"
                                name="purpose"
                                value={purchase.purpose}
                                onChange={handleChange}
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <InputLabel
                                sx={{
                                    display: "flex",
                                    justifyContent: "left",
                                    fontWeight: 700
                                }}
                            >
                                Email id
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <TextField
                                required
                                id="artist"
                                name="email"
                                value={purchase.email}
                                onChange={handleChange}
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} sm={5}>
                            <InputLabel
                                sx={{
                                    display: "flex",
                                    justifyContent: "left",
                                    fontWeight: 700
                                }}
                            >
                                Date of Requistion
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <TextField
                                required
                                id="artist"
                                name="date"
                                value={purchase.date}
                                onChange={handleChange}
                                type="date"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <InputLabel
                                sx={{
                                    display: "flex",
                                    justifyContent: "left",
                                    fontWeight: 700
                                }}
                            >
                                Attachement 1
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <TextField
                                required
                                id="artist"
                                name="attach"
                                value={purchase.attach}
                                onChange={handleChange}
                                type="file"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button variant="contained" sx={{ color: "white" }}>
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button sx={{ backgroundColor: "whitesmoke", color: "black" }}>
                                cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </React.Fragment>
    );
}
