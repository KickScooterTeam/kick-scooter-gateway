import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import cat from "../icons/404-cat.png";

export default function WrongPath() {
    return (
        <Container maxWidth="md">
            <Grid>
                <img src={cat} alt={"Cat"} width={500}/>
                <Typography variant="h4">
                    404 This route doesn't exist
                </Typography>
            </Grid>
        </Container>
    );
}