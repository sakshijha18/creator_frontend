import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import { currencies } from "../../utils";


export default function PurchaseRequistionForm() {
    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const categories = [
        "science",
        "sports",
        "business",
        "politics",
        "entertainment",
        "technology",
        "world",
        "all"
    ];
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
                                name="title"
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
                                name="artist"
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
                                size="small"
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
                                name="artist"
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
                                name="artist"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                            />
                        </Grid> <Grid item xs={12} sm={5}>
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
                                name="artist"
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
                                name="artist"
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
                                name="artist"
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
                                name="artist"
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
