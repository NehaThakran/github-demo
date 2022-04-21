import http from 'k6/http';
import {Rate} from 'k6/metrics'; 
import { Counter } from "k6/metrics";
import {check, sleep} from 'k6';

const failures = new Rate('failed requests'); //custom metric

export const options = {
  vus: 10, //virtual users
  duration: '10s', //test duration
	thresholds: {
		failed_requests: ['rate<=0'],
		http_req_duration: ['p(95)<500'], //95% of requests must finish within 500ms
	},
};

export default function(){
	const res = http.get('http://test.k6.io/');
	//we are asserting that for every request made, our status code should be 200
	let success = check(res, {
		'http response status code is 200':r => r.status === 200,
	});

	
}