<template>
	<router-link :to="path" :style="{display: 'inline-block'}">
		<div class="tag-wrapper" :style="{backgroundColor: color}">
			<i :style="{borderRightColor: color}"></i>
			{{text}}
		</div>
	</router-link>
</template>

<script>
export default {
	name: 'Tag',
	props: {
        path: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: '#4cae4c'
        }
    },
}
</script>
<style lang="less" scoped>
	.tag-wrapper {
		font-size: 12px;
        display: inline-block;
        text-decoration: none;
        font-weight: normal;
        font-size: 10px;
        color: #fff;
        height: 18px;
        line-height: 18px;
        float: left;
        padding: 0 5px 0px 10px;
        position: relative;
        border-radius: 0 5px 5px 0;
        margin: 5px 9px 5px 8px;

        i {
            position: absolute;
            right: 100%;
            font-size: 0;  
            line-height: 0;  
            border: 9px solid transparent;
        }

        &:after {
            content: " ";
            width: 4px;
            height: 4px;
            background-color: #fff;
            border-radius: 4px;
            -webkit-box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.3);
            box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.3);
            position: absolute;
            top: 7px;
            left: 2px;
        }
	}
</style>