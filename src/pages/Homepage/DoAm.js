import React from 'react'
import Show_graph from '../utilities/show_graph'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// npm install @material-ui/core


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));


export default function DoAm(props) {
    const classes = useStyles();

    return ( 
            //  <Show_graph />
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>


        </Grid>
        <Grid item xs={7}>
          <Show_graph> </Show_graph>
        </Grid>
        
        <Grid item xs={5} sm={3}>
            <center>
                <strong>Thông số độ ẩm hiện tại</strong>
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
            </center>
        </Grid>
        
      </Grid>
    </div>
    )
}
