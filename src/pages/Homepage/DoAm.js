import React, {useState, Component} from 'react'
import Show_graph from '../utilities/show_graph'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import SetThresholdForm from '../utilities/SetThresholdForm'
import { qlDoAmService } from "../../services/quanLyDoAmService"
import { Row, Col, DatePicker, Space, Radio, Table, icons } from 'antd'
// npm i antd
// npm install @material-ui/core

const { RangePicker } = DatePicker;


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
        data_humidity: [],
        data_selected: [],
        labels: [],
        isViewSelectedTime: false,
        isViewDetail: false,
        isViewByDay: false
      };
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
    fixTimeBtn = ()=>{
      if(this.isFixTime) this.isFixTime = 0;
      else this.isFixTime = 1;
    }
    viewLiveData = ()=>{
      this.isViewBySelectedTime = 0;
      this.isViewByDay = 0;
      this.data_day = [];
      this.labels_day = [];
      this.first_time_loaded = 1;
      this.setState({
        isViewSelectedTime: false,
        isViewByDay: false
      })
    }
    
    viewDataDetail = ()=>{
      
      this.data_overal = this.state.data_selected;
      this.time_overal = this.state.labels;
      // console.log("AAA");
      this.setState({
        data_selected: this.data_day,
        labels: this.labels_day,
        isViewDetail: true
      });
    }
    viewGeneral = ()=>{
      this.setState({
        data_selected: this.data_overal,
        labels: this.time_overal,
        isViewDetail: false
      });
    }
    // VARIABLE:
    data_day = [];
    labels_day= [];
    data_to_time = [];
    date_time_str = "";
    date_time_type = new Date();
    end_Date = "";
    start_Date = "";
    first_time_loaded = 1;
    isViewBySelectedTime = 0;
    isViewByDay = 0;
    isFixTime = 0;
    data_overal = [];
    time_overal = [];
    isViewDetail = 0;
    DAY_NUMS = 30;
    NUM_COLUMNS = 10;
    componentDidMount() {
        const fetchdata = () => {fetch('http://localhost:8080/api/9/moistureInfo')
          .then(res => res.json())
          .then(json => {
              // console.log("Data humidity laaa: "); console.log(json.moistureSensor.moistureInfoes[1]);
              if((!this.isViewByDay) && (!this.isViewBySelectedTime)){
              this.setState({
                  data_humidity: json.moistureSensor.moistureInfoes
              });
              if(this.first_time_loaded){
                for(var i = 1; i < 8; i++){
                  this.data_day.push(this.state.data_humidity[this.state.data_humidity.length-i].moisture);
                  this.date_time_str = this.state.data_humidity[this.state.data_humidity.length-i].updatedAt;
                  this.date_time_type = new Date(this.date_time_str);
                  this.labels_day.push(this.date_time_type.getHours().toString() + ':' + this.date_time_type.getMinutes().toString() + ":" + this.date_time_type.getSeconds().toString());
                }
                this.first_time_loaded = 0;
              }
              // console.log("Length laaa: "); console.log(json.moistureSensor.moistureInfoes.length);
              // console.log("Data laaa: "); console.log(json.moistureSensor.moistureInfoes[1].moisture);
              this.data_day.push(this.state.data_humidity[this.state.data_humidity.length-1].moisture);
              
              
              this.date_time_str = this.state.data_humidity[this.state.data_humidity.length-1].updatedAt;
              this.date_time_type = new Date(this.date_time_str);
              // console.log("Type laaa: "); console.log(this.date_time_type);
              this.labels_day.push(this.date_time_type.getHours().toString() + ':' + this.date_time_type.getMinutes().toString() + ":" + this.date_time_type.getSeconds().toString());
              if(!this.isFixTime){
                this.labels_day.shift();
                this.data_day.shift();
              }
              
              this.setState({
                data_selected: this.data_day,
                labels: this.labels_day
              });
            }
          }).catch((err) => {
              console.log(err);
          });}
        // console.log("Whyyyy", this.isViewBySelectedTime);
        this._interval = window.setInterval(fetchdata, 2000);
    }

    handleChangeDebut = async (range) => {

      if (range[0].hours() < 10) {
        this.start_Date  =  await ('0' + range[0].hours() + ":" + range[0].minutes() + ":" + range[0].seconds() + " " + range[0].date()  + "/" + Number(range[0].month() + 1) + "/" + range[0].year());
      } else {
        this.start_Date  =  await (range[0].hours() + ":" + range[0].minutes() + ":" + range[0].seconds() + " " + range[0].date()  + "/" + Number(range[0].month() + 1) + "/" + range[0].year());
      }
  
      if (range[1].hours() < 10) {
        this.end_Date = await ('0' + range[1].hours() + ":" + range[1].minutes() + ":" + range[1].seconds() + " " + range[1].date()  + "/" + Number(range[1].month() + 1) + "/" + range[1].year());
      } else {
        this.end_Date = await (range[1].hours() + ":" + range[1].minutes() + ":" + range[1].seconds() + " " + range[1].date()  + "/" + Number(range[1].month() + 1) + "/" + range[1].year());
      }
      //let range_picker ='time_start=' + start_Date + " &time_end=" + end_Date
      // this.setState({range_picker: range_picker})
    }
    viewByDay = async () => {
      try{
        fetch('http://localhost:8080/api/9/moistureInfo')
        .then(res => res.json())
        .then(json => {
          this.setState({
            data_humidity: json.moistureSensor.moistureInfoes
          });
          this.data_day = [];
          this.labels_day = [];
          // Xu ly data view by day:
          let sum_day_temp = 0, reset_new_day = 1, count_new_day = 0, temp_current_day = 0;
          for(var i = 0; i < (1+ this.NUM_COLUMNS*this.DAY_NUMS); i++){
              this.date_time_str = this.state.data_humidity[this.state.data_humidity.length - i - 1].updatedAt;
              this.date_time_type = new Date(this.date_time_str);
              // this.labels_day.push(this.date_time_type.getHours().toString() + ':' + this.date_time_type.getMinutes().toString() + ":" + this.date_time_type.getSeconds().toString());
              if(reset_new_day) {
                temp_current_day = this.date_time_type.getMinutes();
                reset_new_day = 0;
              }
              if(this.date_time_type.getMinutes() == temp_current_day){
                sum_day_temp += this.state.data_humidity[this.state.data_humidity.length - i - 1].moisture;
                count_new_day++;
              }else{
                reset_new_day = 1;
                this.data_day.push( sum_day_temp/count_new_day);
                this.labels_day.push(temp_current_day);
                count_new_day = 0;
                sum_day_temp = 0;
              }
            
          }
          this.setState({
            data_selected: this.data_day.reverse(),
            labels: this.labels_day.reverse(),
            isViewByDay: true
          });
          this.isViewByDay = 1;
          
        })
      }catch (err) {
        console.log('error')
        alert("Không có dữ liệu được hiển thị. Hãy xem lại thông tin")
      }
    }

    loadSensorInfo = async () => {
      try {
        
        fetch('http://localhost:8080/api/9/moistureInfo')
          .then(res => res.json())
          .then(json => {
              this.setState({
                data_humidity: json.moistureSensor.moistureInfoes
              });
              this.data_day = [];
              this.labels_day = [];
              // console.log("AAA");
              for(var i = 0; i < this.state.data_humidity.length-1; i++){
                // console.log("Check TIMEEEE", this.state.data_humidity[i].updatedAt )
                if(this.state.data_humidity[i].updatedAt > this.start_Date && this.state.data_humidity[i].updatedAt < this.end_Date){
                  // console.log("If")
                  this.data_day.push(this.state.data_humidity[i].moisture);
                  this.date_time_str = this.state.data_humidity[i].updatedAt;
                  this.date_time_type = new Date(this.date_time_str);
                  this.labels_day.push(this.date_time_type.getHours().toString() + ':' + this.date_time_type.getMinutes().toString() + ":" + this.date_time_type.getSeconds().toString());
                  // this.data_day.shift();
                }
              }
              // Load xong data
              //Xu ly data selected by time:
              let data = [], label = [];
              let num_of_cluster = 0, count_new_cluster = 0, count_num_last_cluster = 0;
              let sum_data = 0, count_final_cluster = 0;
              
              if(this.data_day.length > 10){
                // console.log("Hereeeeeeeeee");
                num_of_cluster = Math.floor((this.data_day.length -1)/10); //87 / 10 = 8
                // console.log("Oooo: ", num_of_cluster/2);
                for(var i = 0; i < this.data_day.length - 1; i++){
                  if(count_new_cluster < num_of_cluster){
                    sum_data += this.data_day[i];
                    count_new_cluster++;  
                    count_final_cluster = 1;
                    count_num_last_cluster++;
                  } else {
                    count_num_last_cluster = 0;
                    count_final_cluster = 0;
                    count_new_cluster = 0;
                    data.push(sum_data/num_of_cluster);
                    label.push(this.labels_day[i-Math.floor(num_of_cluster/2)]);
                    sum_data = 0;
                  }
                }
                
                if(count_final_cluster){
                  data.push(sum_data/count_num_last_cluster);
                  label.push(this.labels_day[this.data_day.length -1]);
                }
                // console.log("Data PRE laaaaa: ", data);
                // console.log("label PRE laaaaa: ", label);
                this.setState({
                  data_selected: data,
                  labels: label
                });
              }
              else{
                this.setState({
                  data_selected: this.data_day,
                  labels: this.labels_day
                });
              }
              this.setState({
                isViewSelectedTime: true
              })
              this.isViewBySelectedTime = 1;
              // console.log("Data day laaaaa: ", this.data_day);
              // console.log("Data label laaaaa: ", this.labels_day);
              // this.data_day.push(this.state.data_humidity[this.state.data_humidity.length-1].moisture);
              // this.data_day.shift();
          }).catch((err) => {
              console.log(err);
          });
    
        // // }
      } catch (err) {
        console.log('error')
        alert("Không có dữ liệu được hiển thị. Hãy xem lại thông tin")
      }
    }

    render(){
      var {isAdvancedViews, isDay, isMonth, isYear, viewBar, viewLine, data_humidity, data_selected, labels, isViewSelectedTime, isViewDetail, isViewByDay} = this.state;
      var formSet = isAdvancedViews? '':<SetThresholdForm />;
      // var datas = this.data_day; //isDay? this.data_day : (isMonth? this.data_month: (isYear? this.data_year: this.data_normal));
      // var labels =  this.labels_day;//isDay? this.labels_day : (isMonth? this.labels_month: (isYear? this.labels_year: this.labels_normal));
      var viewType = viewLine? true : false;
      var start_day = this.start_Date
    
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
                {
                isViewByDay?
                <Button variant="contained" color='secondary' onClick={ this.viewLiveData }>
                    Xem trực tiếp
                </Button>
                : ""
                }
                {/* <Button variant="contained" color="primary" onClick={ this.viewByMonth }>
                  Tháng
                </Button>
                <Button variant="contained" color="primary" onClick={ this.viewByYear }>
                  Năm
                </Button> */}
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
              <Show_graph data={data_selected} label={labels} viewtypee={viewLine}  />
              <center>
                <Button variant="contained" color="primary" onClick={ this.viewBar }>
                  Biểu đồ cột
                </Button>
                <Button variant="contained" color="primary" onClick={ this.viewLine }>
                  Biểu đồ đường
                </Button>
                <Button variant="contained" color="primary" onClick={ this.fixTimeBtn }>
                  Cố định mốc thời gian
                </Button>
                <Row className="with-80">
				     	<Col span={24}>
				     		<Space direction="vertical" size={12}>
							    <RangePicker renderExtraFooter={() => 'extra footer'} showTime format="DD/MM/YYYY HH:mm:ss" onChange={this.handleChangeDebut}/>
							</Space>
				     	</Col>
               
				      </Row>
              {
              isViewSelectedTime?
              <Button variant="contained" color='secondary' onClick={ this.viewLiveData }>
                  Xem trực tiếp
              </Button>
              : ""
              }
              <Button variant="contained" color='secondary' onClick={ this.loadSensorInfo }>
                  Chọn thời gian
              </Button>
              {
              isViewSelectedTime?
                isViewDetail?
              <Button variant="contained" color='secondary' onClick={ this.viewGeneral }>
                  Xem tổng quan
              </Button>
              :
              <Button variant="contained" color='secondary' onClick={ this.viewDataDetail }>
                  Xem chi tiết
              </Button>
              
              : ""
              }
              </center>
              
            </Grid>
            
            {formSet}
            
          </Grid>
        </div>
        )
    }
    
}

export default DoAm;

// /**
// import React, {useState, Component} from 'react'
// import Show_graph from '../utilities/show_graph'
// import Grid from '@material-ui/core/Grid';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button'
// import SetThresholdForm from '../utilities/SetThresholdForm'
// import { qlDoAmService } from "../../services/quanLyDoAmService"
// import { Row, Col, DatePicker, Space, Radio, Table, icons } from 'antd'
// // npm i antd
// // npm install @material-ui/core

// const { RangePicker } = DatePicker;



// class DoAm extends Component {
//     constructor(props){
//       super(props);
//       this.state = {
//         isAdvancedViews: false,
//         isDay: true,
//         isMonth: false,
//         isYear: false,
//         viewBar: false,
//         viewLine: true,
//         data_humidity: [],
//         data_selected: [],
//         labels: [],
//         isViewSelectedTime: false,
//         isViewDetail: false
//       };
//     }
    
//     viewByDay = () => {
//       this.setState({
//         isAdvancedViews: true,
//         isDay: true,
//         isMonth: false,
//         isYear: false
//       });
//     }
//     viewByMonth = () => {
//       this.setState({
//         isAdvancedViews: true,
//         isDay: false,
//         isMonth: true,
//         isYear: false
//       });
//     }
//     viewByYear = () => {
//       this.setState({
//         isAdvancedViews: true,
//         isDay: false,
//         isMonth: false,
//         isYear: true
//       });
//     }
//     backMainView = ()=>{
//       this.setState({
//         isAdvancedViews: false
//       });
//     }
//     viewLine = ()=>{
//       this.setState({
//         viewLine: true,
//         viewBar: false
//       });
//     }
//     viewBar = ()=>{
//       this.setState({
//         viewLine: false,
//         viewBar: true
//       });
//     }
//     fixTimeBtn = ()=>{
//       if(this.isFixTime) this.isFixTime = 0;
//       else this.isFixTime = 1;
//     }
//     viewLiveData = ()=>{
//       this.isViewBySelectedTime = 0;
//       this.data_day = [];
//       this.labels_day = [];
//       this.first_time_loaded = 1;
//       this.setState({
//         isViewSelectedTime: false
//       })
//     }
    
//     viewDataDetail = ()=>{
      
//       this.data_overal = this.state.data_selected;
//       this.time_overal = this.state.labels;
//       console.log("AAA");
//       this.setState({
//         data_selected: this.data_day,
//         labels: this.labels_day,
//         isViewDetail: true
//       });
//     }
//     viewGeneral = ()=>{
//       this.setState({
//         data_selected: this.data_overal,
//         labels: this.time_overal,
//         isViewDetail: false
//       });
//     }
//     data_day = [];
//     labels_day= [];
//     data_to_time = [];
//     date_time_str = "";
//     date_time_type = new Date();
//     end_Date = "";
//     start_Date = "";
//     first_time_loaded = 1;
//     isViewBySelectedTime = 0;
//     isFixTime = 0;
//     data_overal = [];
//     time_overal = [];
//     isViewDetail = 0;
//     componentDidMount() {
//         const fetchdata = () => {fetch('http://localhost:8080/api/9/moistureInfo')
//           .then(res => res.json())
//           .then(json => {
//               // console.log("Data humidity laaa: "); console.log(json.moistureSensor.moistureInfoes[1]);
//               if(!this.isViewBySelectedTime){
//               this.setState({
//                   data_humidity: json.moistureSensor.moistureInfoes
//               });
//               if(this.first_time_loaded){
//                 for(var i = 1; i < 8; i++){
//                   this.data_day.push(this.state.data_humidity[this.state.data_humidity.length-i].moisture);
//                   this.date_time_str = this.state.data_humidity[this.state.data_humidity.length-i].updatedAt;
//                   this.date_time_type = new Date(this.date_time_str);
//                   this.labels_day.push(this.date_time_type.getHours().toString() + ':' + this.date_time_type.getMinutes().toString() + ":" + this.date_time_type.getSeconds().toString());
//                 }
//                 this.first_time_loaded = 0;
//               }
//               // console.log("Length laaa: "); console.log(json.moistureSensor.moistureInfoes.length);
//               // console.log("Data laaa: "); console.log(json.moistureSensor.moistureInfoes[1].moisture);
//               this.data_day.push(this.state.data_humidity[this.state.data_humidity.length-1].moisture);
              
              
//               this.date_time_str = this.state.data_humidity[this.state.data_humidity.length-1].updatedAt;
//               this.date_time_type = new Date(this.date_time_str);
//               // console.log("Type laaa: "); console.log(this.date_time_type);
//               this.labels_day.push(this.date_time_type.getHours().toString() + ':' + this.date_time_type.getMinutes().toString() + ":" + this.date_time_type.getSeconds().toString());
//               if(!this.isFixTime){
//                 this.labels_day.shift();
//                 this.data_day.shift();
//               }
              
//               this.setState({
//                 data_selected: this.data_day,
//                 labels: this.labels_day
//               });
//             }
//           }).catch((err) => {
//               console.log(err);
//           });}
//         // console.log("Whyyyy", this.isViewBySelectedTime);
//         this._interval = window.setInterval(fetchdata, 2000);
//     }

//     handleChangeDebut = async (range) => {

//       if (range[0].hours() < 10) {
//         this.start_Date  =  await ('0' + range[0].hours() + ":" + range[0].minutes() + ":" + range[0].seconds() + " " + range[0].date()  + "/" + Number(range[0].month() + 1) + "/" + range[0].year());
//       } else {
//         this.start_Date  =  await (range[0].hours() + ":" + range[0].minutes() + ":" + range[0].seconds() + " " + range[0].date()  + "/" + Number(range[0].month() + 1) + "/" + range[0].year());
//       }
  
//       if (range[1].hours() < 10) {
//         this.end_Date = await ('0' + range[1].hours() + ":" + range[1].minutes() + ":" + range[1].seconds() + " " + range[1].date()  + "/" + Number(range[1].month() + 1) + "/" + range[1].year());
//       } else {
//         this.end_Date = await (range[1].hours() + ":" + range[1].minutes() + ":" + range[1].seconds() + " " + range[1].date()  + "/" + Number(range[1].month() + 1) + "/" + range[1].year());
//       }
//       //let range_picker ='time_start=' + start_Date + " &time_end=" + end_Date
//       // this.setState({range_picker: range_picker})
//     }

//     loadSensorInfo = async () => {
//       try {
        
//         fetch('http://localhost:8080/api/9/moistureInfo')
//           .then(res => res.json())
//           .then(json => {
//               this.setState({
//                 data_humidity: json.moistureSensor.moistureInfoes
//               });
//               this.data_day = [];
//               this.labels_day = [];
//               console.log("AAA");
//               for(var i = 0; i < this.state.data_humidity.length-1; i++){
//                 console.log("Check TIMEEEE", this.state.data_humidity[i].updatedAt )
//                 if(this.state.data_humidity[i].updatedAt > this.start_Date && this.state.data_humidity[i].updatedAt < this.end_Date){
//                   console.log("If")
//                   this.data_day.push(this.state.data_humidity[i].moisture);
//                   this.date_time_str = this.state.data_humidity[i].updatedAt;
//                   this.date_time_type = new Date(this.date_time_str);
//                   this.labels_day.push(this.date_time_type.getHours().toString() + ':' + this.date_time_type.getMinutes().toString() + ":" + this.date_time_type.getSeconds().toString());
//                   // this.data_day.shift();
//                 }
//               }
//               // Load xong data
//               //Xu ly data:
//               let data = [], label = [];
//               let num_of_cluster = 0, count_new_cluster = 0, count_num_last_cluster = 0;
//               let sum_data = 0, count_final_cluster = 0;
              
//               if(this.data_day.length > 10){
//                 console.log("Hereeeeeeeeee");
//                 num_of_cluster = Math.floor((this.data_day.length -1)/10); //87 / 10 = 8
//                 // console.log("Oooo: ", num_of_cluster/2);
//                 for(var i = 0; i < this.data_day.length - 1; i++){
//                   if(count_new_cluster < num_of_cluster){
//                     sum_data += this.data_day[i];
//                     count_new_cluster++;  
//                     count_final_cluster = 1;
//                     count_num_last_cluster++;
//                   } else {
//                     count_num_last_cluster = 0;
//                     count_final_cluster = 0;
//                     count_new_cluster = 0;
//                     data.push(sum_data/num_of_cluster);
//                     label.push(this.labels_day[i-Math.floor(num_of_cluster/2)]);
//                     sum_data = 0;
//                   }
//                 }

//                 if(count_final_cluster){
//                   data.push(sum_data/count_num_last_cluster);
//                   label.push(this.labels_day[this.data_day.length -1]);
//                 }
//                 console.log("Data PRE laaaaa: ", data);
//                 console.log("label PRE laaaaa: ", label);
//                 this.setState({
//                   data_selected: data,
//                   labels: label
//                 });
                
//               }
//               else{
//                 this.setState({
//                   data_selected: this.data_day,
//                   labels: this.labels_day
//                 });
//               }
//               this.setState({
//                 isViewSelectedTime: true
//               })
//               this.isViewBySelectedTime = 1;
//               console.log("Data day laaaaa: ", this.data_day);
//               console.log("Data label laaaaa: ", this.labels_day);
//               // this.data_day.push(this.state.data_humidity[this.state.data_humidity.length-1].moisture);
//               // this.data_day.shift();
//           }).catch((err) => {
//               console.log(err);
//           });
    
//         // // }
//       } catch (err) {
//         console.log('error')
//         alert("Không có dữ liệu được hiển thị. Hãy xem lại thông tin")
//       }
//     }

//     render(){
//       var {isAdvancedViews, isDay, isMonth, isYear, viewBar, viewLine, data_humidity, data_selected, labels, isViewSelectedTime, isViewDetail} = this.state;
//       var formSet = isAdvancedViews? '':<SetThresholdForm />;
//       // var datas = this.data_day; //isDay? this.data_day : (isMonth? this.data_month: (isYear? this.data_year: this.data_normal));
//       // var labels =  this.labels_day;//isDay? this.labels_day : (isMonth? this.labels_month: (isYear? this.labels_year: this.labels_normal));
//       var viewType = viewLine? true : false;
//       var start_day = this.start_Date
    
//       return ( 
//         //  <Show_graph />
//         <div >
//           <Grid container spacing={3}>
//             <Grid item xs={10} sm={12}>
              
//             </Grid>
            
//             <Grid item xs={isAdvancedViews? 12:7}>
//               {/* <center>
//                 <Button variant="contained" color="primary" onClick={ this.viewByDay }>
//                   Ngày
//                 </Button>
//                 <Button variant="contained" color="primary" onClick={ this.viewByMonth }>
//                   Tháng
//                 </Button>
//                 <Button variant="contained" color="primary" onClick={ this.viewByYear }>
//                   Năm
//                 </Button>
//               </center> */}
//               {
//                 isAdvancedViews?
//                 <left>
//                 <Button variant="contained" color='secondary' onClick={ this.backMainView }>
//                   Trở lại
//                 </Button>
//               </left>
//               : ''
//               } 
//               <Show_graph data={data_selected} label={labels} viewtypee={viewLine}  />
//               <center>
//                 <Button variant="contained" color="primary" onClick={ this.viewBar }>
//                   Biểu đồ cột
//                 </Button>
//                 <Button variant="contained" color="primary" onClick={ this.viewLine }>
//                   Biểu đồ đường
//                 </Button>
//                 <Button variant="contained" color="primary" onClick={ this.fixTimeBtn }>
//                   Cố định mốc thời gian
//                 </Button>
//                 <Row className="with-80">
// 				     	<Col span={24}>
// 				     		<Space direction="vertical" size={12}>
// 							    <RangePicker renderExtraFooter={() => 'extra footer'} showTime format="DD/MM/YYYY HH:mm:ss" onChange={this.handleChangeDebut}/>
// 							</Space>
// 				     	</Col>
               
// 				      </Row>
//               {
//               isViewSelectedTime?
//               <Button variant="contained" color='secondary' onClick={ this.viewLiveData }>
//                   Xem trực tiếp
//               </Button>
//               : ""
//               }
//               <Button variant="contained" color='secondary' onClick={ this.loadSensorInfo }>
//                   Chọn thời gian
//               </Button>
//               {
//               isViewSelectedTime?
//                 isViewDetail?
//               <Button variant="contained" color='secondary' onClick={ this.viewGeneral }>
//                   Xem tổng quan
//               </Button>
//               :
//               <Button variant="contained" color='secondary' onClick={ this.viewDataDetail }>
//                   Xem chi tiết
//               </Button>
              
//               : ""
//               }
//               </center>
              
//             </Grid>
            
//             {formSet}
            
//           </Grid>
//         </div>
//         )
//     }
    
// }

// export default DoAm;

//  */