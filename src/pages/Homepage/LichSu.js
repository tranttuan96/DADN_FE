import React, { Component, ReactDOM, useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
  NavLink
} from "react-router-dom";
import '../../assets/scss/Layout/LichSu.scss'
import { Row, Col, DatePicker, Space, Radio, Table, Button, icons } from 'antd'
import { qlDoAmService } from "../../services/quanLyDoAmService"

const { RangePicker } = DatePicker;

export default class LichSu extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			data: [],
			range_picker: "",
			History_value: "a",
			Table: false,
			pump_data: [],
			firstAccess: true,
			currentFarm: 0,
			farms: [],
			sensorID: "",
			pumpID: "",
			threshold: []
		};
	}


	componentDidMount = async () => {
		if (this.state.firstAccess) {
			await qlDoAmService.layDanhSachNongTrai()
				.then(res =>  this.setState({farms: res.data}))
				.catch(error => console.log(error));
		}
		if(this.state.sensorID === "") {
			await qlDoAmService.layDanhSachSensor(this.state.farms[this.state.currentFarm].id)
				.then(res => this.setState({sensorID: res.data[0].id}))
				.catch(error => console.log(error));

			await qlDoAmService.layDanhSachMayBom(this.state.farms[this.state.currentFarm].id)
				.then(res => this.setState({pumpID: res.data[0].id}));
		}
	}


	loadSensorInfo = async () => {
		if (this.state.History_value == "a") {
			try {
				let url = 'http://localhost:8080/api/moistureInfoes/time?' + this.state.range_picker
				console.log(url)
				let response = await fetch(url)
				let result = await response.json()
				console.log(result)
				this.setState({data: result})
				this.setState({Table: true})
			} catch (err) {
				console.log('error')
				alert("Không có dữ liệu được hiển thị. Hãy xem lại thông tin")
			}
		}
		else if (this.state.History_value == "b") {
			try {
				let url = 'http://localhost:8080/api/pumpInfo/time?' + this.state.range_picker
				console.log(url)
				let response = await fetch(url)
				let result = await response.json()
				console.log(result)
				this.setState({pump_data: result})
				this.setState({Table: true})
			} catch (err) {
				console.log('error')
				alert("Không có dữ liệu được hiển thị. Hãy xem lại thông tin")
			}
		}
		else if (this.state.History_value == "c") {
			try {
				let url = 'http://localhost:8080/api/threshold/time?' + this.state.range_picker
				console.log(url)
				let response = await fetch(url)
				let result = await response.json()
				console.log(result)
				this.setState({threshold: result})
				this.setState({Table: true})
			} catch (err) {
				console.log('error')
				alert("Không có dữ liệu được hiển thị. Hãy xem lại thông tin")
			}
		}
	}

	handleChangeDebut = async (range) => {

		let start_Date
		if (range[0].hours() < 10) {
			start_Date  =  await ('0' + range[0].hours() + ":" + range[0].minutes() + ":" + range[0].seconds() + " " + range[0].date()  + "/" + Number(range[0].month() + 1) + "/" + range[0].year());
		} else {
			start_Date  =  await (range[0].hours() + ":" + range[0].minutes() + ":" + range[0].seconds() + " " + range[0].date()  + "/" + Number(range[0].month() + 1) + "/" + range[0].year());
		}

	    let end_Date
	    if (range[1].hours() < 10) {
	    	end_Date = await ('0' + range[1].hours() + ":" + range[1].minutes() + ":" + range[1].seconds() + " " + range[1].date()  + "/" + Number(range[1].month() + 1) + "/" + range[1].year());
	    } else {
	    	end_Date = await (range[1].hours() + ":" + range[1].minutes() + ":" + range[1].seconds() + " " + range[1].date()  + "/" + Number(range[1].month() + 1) + "/" + range[1].year());
	    }

	    let range_picker ='time_start=' + start_Date + " &time_end=" + end_Date

	    this.setState({range_picker: range_picker})
	}

	handleChangeSelectFarm = async (event) => {
		let { value } = event.target;
		await this.setState({currentFarm: value});
	}

	chooseFirstTime = async () => {
		await this.setState({firstAccess: false});
	}


	render() {
		const thongTinUserFarm = useSelector((state) => state.UserFarmReducer);
		if (this.state.firstAccess) {
			return (
				<div className="popupFarms">

					<h4>Vui lòng chọn nông trại: </h4>
					<select
					className="form-select"
					name="farm"
					aria-label="Default select"
					onChange={this.handleChangeSelectFarm}
					>
					<option defaultValue hidden>
					Lựa chọn nông trại
					</option>
					{this.state.farms.map((farm, i) => {
					return <option key={i} value={i}>{farm.name}</option>;
					})}
					</select>

					<div className="confirm">
						<button className="btn btn-success" onClick={this.chooseFirstTime}>
						Xác nhận
						</button>
					</div>
				</div>
			);
		}
		else {

			if (this.state.Table == false) {
				return ( 
			    	<div className="wrapper">
			    		<div className="chose__farm change__farm">
							<p>Thay đổi nông trại: </p>
							<select className="form-select" name="farm" aria-label="Default select" onChange={this.handleChangeSelectFarm}>
								<option value={this.state.farms[this.state.currentFarm].name} defaultValue hidden>{this.state.farms[this.state.currentFarm].name}</option>
								{this.state.farms.map((farm, i) => {
								return <option key={i} value={i}>{farm.name}</option>
								})}
							</select>
						</div>
			    		<Row className="with-80">
					     	<Col span={24}>
					     		<h1 className="header">Lựa chọn thông tin cần xem</h1>
					     	</Col>
					    </Row>
					    <Row className="with-80">
					     	<Col span={24}>
					     		<h2 className="header">Thời gian hiển thị</h2>
					     	</Col>
					    </Row>
					    <Row className="with-80">
					     	<Col span={24}>
					     		<Space direction="vertical" size={12}>
								    <RangePicker renderExtraFooter={() => 'extra footer'} showTime format="DD/MM/YYYY HH:mm:ss" onChange={this.handleChangeDebut}/>
								</Space>
					     	</Col>
					    </Row>
					    <Row className="with-80">
					     	<Col span={24}>
					     		<h2 className="header">Lựa chọn kiểu dữ liệu lịch sử</h2>
					     	</Col>
					    </Row>
					    <Row>
					     	<Col span={24}>
					     		<Radio.Group defaultValue="a" size="large" buttonStyle="solid">
									<Radio.Button value="a" onClick={() => {this.setState({History_value: "a"})}}>Lịch sử dữ liệu từ sensor</Radio.Button>
									<Radio.Button value="b" onClick={() => {this.setState({History_value: "b"})}}>Lịch sử điều khiển</Radio.Button>
									<Radio.Button value="c" onClick={() => {this.setState({History_value: "c"})}}>Lịch sử thiết lập ngưỡng</Radio.Button>
								</Radio.Group>
					     	</Col>
					    </Row>
				        <Button type="primary" className="Apply-Button" onClick={this.loadSensorInfo} >Xác nhận</Button>
				        <Button type="primary" className="Cancle-Button" danger>Hủy</Button>
			        </div>
			    )
			}
			else {
				if (this.state.History_value == "a") {
					return ( 
				    	<div className="wrapper">
				    		<div className="chose__farm change__farm">
								<p>Thay đổi nông trại: </p>
								<select className="form-select" name="farm" aria-label="Default select" onChange={this.handleChangeSelectFarm}>
									<option value={this.state.farms[this.state.currentFarm].name} defaultValue hidden>{this.state.farms[this.state.currentFarm].name}</option>
									{this.state.farms.map((farm, i) => {
									return <option key={i} value={i}>{farm.name}</option>
									})}
								</select>
							</div>
				    		<Row className="with-80">
						     	<Col span={24}>
						     		<h1 className="header">Lựa chọn thông tin cần xem</h1>
						     	</Col>
						    </Row>
						    <Row className="with-80">
						     	<Col span={24}>
						     		<h2 className="header">Thời gian hiển thị</h2>
						     	</Col>
						    </Row>
						    <Row className="with-80">
						     	<Col span={24}>
						     		<Space direction="vertical" size={12}>
									    <RangePicker renderExtraFooter={() => 'extra footer'} showTime format="DD/MM/YYYY HH:mm:ss" onChange={this.handleChangeDebut}/>
									</Space>
						     	</Col>
						    </Row>
						    <Row className="with-80">
						     	<Col span={24}>
						     		<h2 className="header">Lựa chọn kiểu dữ liệu lịch sử</h2>
						     	</Col>
						    </Row>
						    <Row>
						     	<Col span={24}>
						     		<Radio.Group defaultValue="a" size="large" buttonStyle="solid">
										<Radio.Button value="a" onClick={() => {this.setState({History_value: "a"})}}>Lịch sử dữ liệu từ sensor</Radio.Button>
										<Radio.Button value="b" onClick={() => {this.setState({History_value: "b"})}}>Lịch sử điều khiển</Radio.Button>
										<Radio.Button value="c" onClick={() => {this.setState({History_value: "c"})}}>Lịch sử thiết lập ngưỡng</Radio.Button>
									</Radio.Group>
						     	</Col>
						    </Row>
					        <Button type="primary" className="Apply-Button" onClick={this.loadSensorInfo} >Xác nhận</Button>
					        <Button type="primary" className="Cancle-Button" danger>Hủy</Button>
					      	<SensorTable data ={this.state.data}/>
				        </div>
				    )
				}
				else if (this.state.History_value == "b") {
					return ( 
				    	<div className="wrapper">
				    		<div className="chose__farm change__farm">
								<p>Thay đổi nông trại: </p>
								<select className="form-select" name="farm" aria-label="Default select" onChange={this.handleChangeSelectFarm}>
									<option value={this.state.farms[this.state.currentFarm].name} defaultValue hidden>{this.state.farms[this.state.currentFarm].name}</option>
									{this.state.farms.map((farm, i) => {
									return <option key={i} value={i}>{farm.name}</option>
									})}
								</select>
							</div>
				    		<Row className="with-80">
						     	<Col span={24}>
						     		<h1 className="header">Lựa chọn thông tin cần xem</h1>
						     	</Col>
						    </Row>
						    <Row className="with-80">
						     	<Col span={24}>
						     		<h2 className="header">Thời gian hiển thị</h2>
						     	</Col>
						    </Row>
						    <Row className="with-80">
						     	<Col span={24}>
						     		<Space direction="vertical" size={12}>
									    <RangePicker renderExtraFooter={() => 'extra footer'} showTime format="DD/MM/YYYY HH:mm:ss" onChange={this.handleChangeDebut}/>
									</Space>
						     	</Col>
						    </Row>
						    <Row className="with-80">
						     	<Col span={24}>
						     		<h2 className="header">Lựa chọn kiểu dữ liệu lịch sử</h2>
						     	</Col>
						    </Row>
						    <Row>
						     	<Col span={24}>
						     		<Radio.Group defaultValue="a" size="large" buttonStyle="solid">
										<Radio.Button value="a" onClick={() => {this.setState({History_value: "a"})}}>Lịch sử dữ liệu từ sensor</Radio.Button>
										<Radio.Button value="b" onClick={() => {this.setState({History_value: "b"})}}>Lịch sử điều khiển</Radio.Button>
										<Radio.Button value="c" onClick={() => {this.setState({History_value: "c"})}}>Lịch sử thiết lập ngưỡng</Radio.Button>
									</Radio.Group>
						     	</Col>
						    </Row>
					        <Button type="primary" className="Apply-Button" onClick={this.loadSensorInfo} >Xác nhận</Button>
					        <Button type="primary" className="Cancle-Button" danger>Hủy</Button>
					      	<PumpTable data ={this.state.pump_data} />
				        </div>
				    )
				}
				else if (this.state.History_value == "c") {
					return ( 
				    	<div className="wrapper">
				    		<div className="chose__farm change__farm">
								<p>Thay đổi nông trại: </p>
								<select className="form-select" name="farm" aria-label="Default select" onChange={this.handleChangeSelectFarm}>
									<option value={this.state.farms[this.state.currentFarm].name} defaultValue hidden>{this.state.farms[this.state.currentFarm].name}</option>
									{this.state.farms.map((farm, i) => {
									return <option key={i} value={i}>{farm.name}</option>
									})}
								</select>
							</div>
				    		<Row className="with-80">
						     	<Col span={24}>
						     		<h1 className="header">Lựa chọn thông tin cần xem</h1>
						     	</Col>
						    </Row>
						    <Row className="with-80">
						     	<Col span={24}>
						     		<h2 className="header">Thời gian hiển thị</h2>
						     	</Col>
						    </Row>
						    <Row className="with-80">
						     	<Col span={24}>
						     		<Space direction="vertical" size={12}>
									    <RangePicker renderExtraFooter={() => 'extra footer'} showTime format="DD/MM/YYYY HH:mm:ss" onChange={this.handleChangeDebut}/>
									</Space>
						     	</Col>
						    </Row>
						    <Row className="with-80">
						     	<Col span={24}>
						     		<h2 className="header">Lựa chọn kiểu dữ liệu lịch sử</h2>
						     	</Col>
						    </Row>
						    <Row>
						     	<Col span={24}>
						     		<Radio.Group defaultValue="a" size="large" buttonStyle="solid">
										<Radio.Button value="a" onClick={() => {this.setState({History_value: "a"})}}>Lịch sử dữ liệu từ sensor</Radio.Button>
										<Radio.Button value="b" onClick={() => {this.setState({History_value: "b"})}}>Lịch sử điều khiển</Radio.Button>
										<Radio.Button value="c" onClick={() => {this.setState({History_value: "c"})}}>Lịch sử thiết lập ngưỡng</Radio.Button>
									</Radio.Group>
						     	</Col>
						    </Row>
					        <Button type="primary" className="Apply-Button" onClick={this.loadSensorInfo} >Xác nhận</Button>
					        <Button type="primary" className="Cancle-Button" danger>Hủy</Button>
					      	<ThresholdTable data ={this.state.threshold} />
				        </div>
				    )
				}
			}
		}
	}
}

const columns_sensor = [
	{
		title: 'ID',
		dataIndex: 'id',
	},
	{
		title: 'Thời gian cập nhật',
		dataIndex: 'updatedAt',
	},
	{
		title: 'Độ ẩm',
		dataIndex: 'moisture',
		sorter: {
			compare: (a, b) => a.moisture - b.moisture,
			multiple: 1,
		},
	},
	{
		title: 'Sensor ID',
		dataIndex: 'sensor_ID',
	},
];

class SensorTable extends Component {

	onChange(sorter) {
		console.log('params', sorter);
	}

	render() {
		return (
			<Table className="table-with" columns={columns_sensor} dataSource={this.props.data}  rowKey="id" onChange={this.onChange} bordered="true" />
		)
	}
}



const columns_pump = [
	{
		title: 'ID',
		dataIndex: 'id',
	},
	{
		title: 'Thời gian cập nhật',
		dataIndex: 'updatedAt',
	},
	{
		title: 'Kiểu điều khiển',
		dataIndex: 'controlType',
	},
	{
		title: 'Cường độ máy bơm',
		dataIndex: 'intensity',
		sorter: {
			compare: (a, b) => a.intensity - b.intensity,
			multiple: 1,
		},
	},
	{
		title: 'Trạng thái điều khiển',
		dataIndex: 'status',
	},
	{
		title: 'Pump ID',
		dataIndex: 'farm_pump_id',
	},
	{
		title: 'User Name',
		dataIndex: 'user_id_control',
		render: user_id_control => {
			if (user_id_control === "admin") {
				return ""
			}
			else return user_id_control
		}
	},

];


class PumpTable extends Component {

	onChange(sorter) {
		console.log('params', sorter);
	}

	render() {
		return (
			<Table className="table-with" columns={columns_pump} dataSource={this.props.data} rowKey="id" onChange={this.onChange} bordered="true" />
		)
	}
}

const columns_threshold = [
	{
		title: 'ID',
		dataIndex: 'id',
	},
	{
		title: 'Thời gian cập nhật',
		dataIndex: 'updatedAt',
	},
	{
		title: 'Ngưỡng dưới',
		dataIndex: 'lower',
	},
	{
		title: 'Ngưỡng trên',
		dataIndex: 'upper',
	},
	{
		title: 'User Name',
		dataIndex: 'user_id_set_threshold',
	},
];

class ThresholdTable extends Component {
	render() {
		return (
			<Table className="table-with" columns={columns_threshold} dataSource={this.props.data} rowKey="id" onChange={this.onChange} bordered="true" />
		)
	}
}