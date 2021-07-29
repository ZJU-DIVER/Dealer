import React, { Component } from 'react'

export default class ShowPicture extends Component {
    render() {
        return (
            <div className={'singleDisplayGrid'}>
                <p className={'optionName'}>Shapley Value ：</p>
                {/* <Image width={200} src="../../../public/picture1.png"/> */}
                <Image width={'90%'} src="./picture1.png"/>
            </div>
        )
    }
}
