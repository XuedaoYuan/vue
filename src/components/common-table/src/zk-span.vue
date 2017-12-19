<template>
	<span>{{value}}</span>
</template>

<script>
	import moment from 'moment';
	// import trim from 'trim';
	export default {
		props: ['value', 'digit', 'index', 'prop', 'type'],
		data() {
			return {
			}
		},
		methods: {
		},
		watch: {
			'value': {
				immediate: true, 
				handler(val) {
					let returnVal = val;
					// if (val.trim) {
					// 	val = val.trim();
					// }
					if (this.type == 'Number') {
						returnVal = Number(val) || '';
					}else if (this.type == 'Date') {
						if (!val || val == '') {
							returnVal = '';
						}else {
							returnVal = moment(val).format('YYYY-MM-DD')
						}
					}else if (this.type == 'Time') {
						if (!val || val == '') {
							returnVal = '';
						}else {
							returnVal = moment(val).format('YYYY-MM-DD HH:mm:ss')
						}
					}
					if (this.digit || this.digit == 0) {
						if (val === '') {
							returnVal = '';
						}else {
							returnVal = (Number(val) || 0).toFixed(Number(this.digit || 0));
							if (!Number(returnVal) && Number(returnVal) != 0) {
								returnVal = '';
							}	
						}
					}
					this.$emit('limitDigit', this.index, this.prop, returnVal);
				}
			}
		}
	}
</script>