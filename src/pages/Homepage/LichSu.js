import React from 'react'
import '../../assets/scss/Layout/LichSu.css'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default function LichSu(props) {
    return ( 
    	<div className="wrapper">
        	<div className="choose-information" >
        		<h1> 
        			Lựa chọn thông tin
        		</h1>
        		<div>
					<Grid container spacing={6}>
						<Grid item xs>
							<div className="paper-wrapper">
								<h2> Thời gian bắt đầu </h2>
        						<input type="date" className="choose-date"></input>
							</div>
						</Grid>
						<Grid item xs>
							<div className="paper-wrapper">
								<h2> Thời gian kết thúc </h2>
        						<input type="date" className="choose-date"></input>
							</div>
						</Grid>
					</Grid>
        		</div>
        		<div className="option">
        			<Grid container spacing={10}>
						<Grid item xs>
							<div className="wrapper-flex">
								<h4 className="MQTT"> Xem lịch sử MQTT Brocker</h4>
				        		<input className="MQTT" type="checkbox"></input>
				        		<h4 className="MQTT"> Xem lịch sử điều khiển bởi người dùng</h4>
				        		<input className="MQTT" type="checkbox"></input>
							</div>
						</Grid>
					</Grid>
	        	</div>
	        	<button className="Apply-Button">Xác nhận</button>
	        	<button className="Cancle-Button">Hủy</button>
        	</div>
        </div>
    );
};
