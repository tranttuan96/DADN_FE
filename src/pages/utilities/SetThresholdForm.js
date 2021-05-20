import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'

// npm install @material-ui/core


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title:{
      padding: theme.spacing(2),
      textAlign: 'center',
      fontSize: 20,
      color: theme.palette.text.secondary,
    },
    paper: {
      padding: theme.spacing(2),
      fontSize: 15,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));


export default function SetThresholdForm(props) {
    const classes = useStyles();

    return ( 
    <div className={classes.root} 
        style={{marginTop: 80}}>   
      <center>

        <Grid item xs={12} sm={6}>
            <center>
                <strong className={classes.title}>Thông số độ ẩm hiện tại</strong>
                <Paper className={classes.paper}>
                    <Grid item xs={12} sm={12}>
                    <strong>Ngưỡng trên</strong>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <Paper className={classes.paper}>162 mp</Paper>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <strong>Ngưỡng dưới</strong>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <Paper className={classes.paper}>94 mp</Paper>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <strong>Độ ẩm</strong>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <Paper className={classes.paper}>112 mp</Paper>
                    </Grid>
                </Paper>
                <Button variant="contained" color="primary" >
                    Điều chỉnh độ ẩm
                </Button>
            </center>
        </Grid>
      </center>
        
  
    </div>
    )
}
