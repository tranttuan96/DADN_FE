import React, {useState, Component} from 'react'
import Show_graph from '../utilities/show_graph'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import SetThresholdForm from '../utilities/SetThresholdForm'
import { qlDoAmService } from "../../services/quanLyDoAmService"
// npm install @material-ui/core





class DoAm extends Component {
    constructor(props){
      super(props);
      this.state = {
        isAdvancedViews: false,
        isDay: true,
        isMonth: false,
        isYear: false,
        viewBar: false,
        viewLine: true,
        data_humidity: []
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
    viewLine = ()=>{
      this.setState({
        viewLine: true,
        viewBar: false
      });
    }
    viewBar = ()=>{
      this.setState({
        viewLine: false,
        viewBar: true
      });
    }
    data_normal = [30, 22, 22.5, 21, 21, 20.5];
    data_day = [30, 50, 22, 24, 25, 27];
    data_month = [24, 25, 23, 22, 21, 22];
    data_year = [20, 22, 23, 22, 24, 23];
    labels_normal= ['7h00', '8h00', '9h00', '10h00', '11h00', '12h00'];
    labels_day= ['20/04', '21/04', '22/04', '23/04', '24/04', '25/04'];
    labels_month= ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'];
    labels_year= ['2015', '2016', '2017', '2018', '2019', '2020'];
    
    componentDidMount() {
        const fetchdata = () => {fetch('http://localhost:8080/api/9/moistureInfo')
          .then(res => res.json())
          .then(json => {
            // console.log("Data laaa: "); console.log(json.moistureSensor.moistureInfoes[1]);
              this.setState({
                  data_humidity: json.moistureSensor.moistureInfoes
              });
              // console.log("Data laaa: "); console.log(this.state.data_humidity[this.state.data_humidity.length-1].moisture);
              this.data_day.push(this.state.data_humidity[this.state.data_humidity.length-1].moisture);
              this.data_day.shift();
          }).catch((err) => {
              console.log(err);
          });}
        this._interval = window.setInterval(fetchdata, 2000);
    }
    render(){
      var {isAdvancedViews, isDay, isMonth, isYear, viewBar, viewLine, data_humidity } = this.state;
      var formSet = isAdvancedViews? '':<SetThresholdForm />;
      var datas = this.data_day; //isDay? this.data_day : (isMonth? this.data_month: (isYear? this.data_year: this.data_normal));
      var labels = isDay? this.labels_day : (isMonth? this.labels_month: (isYear? this.labels_year: this.labels_normal));
      var viewType = viewLine? true : false;
      
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
              <Show_graph data={datas} label={labels} viewtypee={viewLine}  />
              <center>
                <Button variant="contained" color="primary" onClick={ this.viewBar }>
                  Biểu đồ cột
                </Button>
                <Button variant="contained" color="primary" onClick={ this.viewLine }>
                  Biểu đồ đường
                </Button>
              </center>
              
            </Grid>
            
            {formSet}
            
          </Grid>
        </div>
        )
    }
    
}

export default DoAm;
