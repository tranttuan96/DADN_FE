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
const { RangePicker } = DatePicker;

export default class LichSu extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			range_picker: "",
			History_value: "a",
			Table: false,
			pump_data: []
		};
	}

	loadSensorInfo = async () => {
		if (this.state.History_value == "a") {
			try {
				let url = 'http://localhost:8080/api/moistureInfoes/time?' + this.state.range_picker
				let response = await fetch(url)
				let result = await response.json()
				this.setState({data: result})
				this.setState({Table: true})
			} catch (err) {
				console.log('error')
				alert("Không có dữ liệu được hiển thị. Hãy xem lại thông tin")
			}
		}
		else {
			try {
				let url = 'http://localhost:8080/api/pumpInfo/time?' + this.state.range_picker
				let response = await fetch(url)
				let result = await response.json()
				this.setState({pump_data: result})
				this.setState({Table: true})
			} catch (err) {
				console.log('error')
				alert("Không có dữ liệu được hiển thị. Hãy xem lại thông tin")
			}
		}
	}

	handleChangeDebut = async (range) => {
		let start_Date =  await (range[0].hours() + ":" + range[0].minutes() + ":" + range[0].seconds() + " " + range[0].date()  + "/" + Number(range[0].month() + 1) + "/" + range[0].year());

	    let end_Date = await (range[1].hours() + ":" + range[1].minutes() + ":" + range[1].seconds() + " " + range[1].date()  + "/" + Number(range[1].month() + 1) + "/" + range[1].year());

	    let range_picker ='time_start=' + start_Date + " &time_end=" + end_Date

	    this.setState({range_picker: range_picker})
	}

	render() {
		if (this.state.Table == false) {
			return ( 
		    	<div className="wrapper">
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
								<Radio.Button value="c" disabled>Lịch sử dữ liệu từ máy bơm</Radio.Button>
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
									<Radio.Button value="c" disabled>Lịch sử dữ liệu từ máy bơm</Radio.Button>
								</Radio.Group>
					     	</Col>
					    </Row>
				        <Button type="primary" className="Apply-Button" onClick={this.loadSensorInfo} >Xác nhận</Button>
				        <Button type="primary" className="Cancle-Button" danger>Hủy</Button>
				      	<SensorTable data ={this.state.data} />
			        </div>
			    )
			}
			else {
				return ( 
			    	<div className="wrapper">
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
									<Radio.Button value="c" disabled>Lịch sử dữ liệu từ máy bơm</Radio.Button>
								</Radio.Group>
					     	</Col>
					    </Row>
				        <Button type="primary" className="Apply-Button" onClick={this.loadSensorInfo} >Xác nhận</Button>
				        <Button type="primary" className="Cancle-Button" danger>Hủy</Button>
				      	<PumpTable data ={this.state.pump_data} />
			        </div>
			    )
			}
		}
	};
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
	}
];

class SensorTable extends Component {

	onChange(sorter) {
		console.log('params', sorter);
	}

	render() {
		return (
			<Table className="table-with" columns={columns_sensor} dataSource={this.props.data} rowKey="id" onChange={this.onChange} bordered="true" />
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
			compare: (a, b) => a.moisture - b.moisture,
			multiple: 1,
		},
	},
	{
		title: 'Trạng thái điều khiển',
		dataIndex: 'status',
	}
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
