import React, {useState, Component} from 'react'
import Show_graph from '../utilities/show_graph'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import SetThresholdForm from '../utilities/SetThresholdForm'
// npm install @material-ui/core





class DoAm extends Component {
    constructor(props){
      super(props);
      this.state = {
        isAdvancedViews: false,
        isDay: false,
        isMonth: false,
        isYear: false
      };
    }
   
    viewByDay = () => {
      this.setState({
        isAdvancedViews: true,
        isDay: true,
        isMonth: false,
        isYear: false
      });
    }
    viewByMonth = () => {
      this.setState({
        isAdvancedViews: true,
        isDay: false,
        isMonth: true,
        isYear: false
      });
    }
    viewByYear = () => {
      this.setState({
        isAdvancedViews: true,
        isDay: false,
        isMonth: false,
        isYear: true
      });
    }
    backMainView = ()=>{
      this.setState({
        isAdvancedViews: false
      });
    }

    data_normal = [43, 42, 42.5, 41, 41, 40.5];
    data_day = [42, 43, 42, 44, 45, 47];
    data_month = [44, 45, 43, 42, 41, 42];
    data_year = [40, 42, 43, 42, 44, 43];
    labels_normal= ['7h00', '8h00', '9h00', '10h00', '11h00', '12h00'];
    labels_day= ['20/04', '21/04', '22/04', '23/04', '24/04', '25/04'];
    labels_month= ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'];
    labels_year= ['2015', '2016', '2017', '2018', '2019', '2020'];
    render(){
      var {isAdvancedViews, isDay, isMonth, isYear} = this.state;
      var formSet = isAdvancedViews? '':<SetThresholdForm />;
      var datas = isDay? this.data_day : (isMonth? this.data_month: (isYear? this.data_year: this.data_normal));
      var labels = isDay? this.labels_day : (isMonth? this.labels_month: (isYear? this.labels_year: this.labels_normal));
      return ( 
        //  <Show_graph />
        <div >
          <Grid container spacing={3}>
            <Grid item xs={10} sm={12}>
              
            </Grid>
            
            <Grid item xs={isAdvancedViews? 12:7}>
              <center>
                <Button variant="contained" color="primary" onClick={ this.viewByDay }>
                  Ngày
                </Button>
                <Button variant="contained" color="primary" onClick={ this.viewByMonth }>
                  Tháng
                </Button>
                <Button variant="contained" color="primary" onClick={ this.viewByYear }>
                  Năm
                </Button>
              </center>
              {
                isAdvancedViews?
                <left>
                <Button variant="contained" color='secondary' onClick={ this.backMainView }>
                  Trở lại
                </Button>
              </left>
              : ''
              } 
              <Show_graph data={datas} label={labels}  />
            </Grid>
            
            {formSet}
            
          </Grid>
        </div>
        )
    }
    
}

export default DoAm;
