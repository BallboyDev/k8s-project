import tempData from './temp.json'

import './styles.scss'
import Root from './root'

const Tree = () => {
    const roots = Object.keys(tempData)

    const fileUpload = (e) => {
        // console.log(log.debug('fileUpload'))

        const fileData = e.target.files[0]

        const formData = new FormData();
        formData.append('file', fileData)

        // callApi.post('/api/fileUpload', {
        //     param: {
        //         fileName: fileData.name
        //     }
        // })

    }

    return (

        <div className={'FileTree'}>
            <div className={'FileTree__buttonGroup'}>
                <input type='file' id='input-file' style={{ 'display': 'none' }} onChange={fileUpload} />
                <label htmlFor='input-file' style={{ 'cursor': 'pointer' }} >upload</label>
                {/* <div className={''} onClick={fileUpload} >
                    
                </div> */}
                {/* <div className={''} onClick={() => { }}>
                    2
                </div>
                <div className={''}>
                    3
                </div> */}
            </div>
            <div>
                {
                    roots.map((v, i) => {
                        return (
                            <Root key={`${v}${i}`} title={v} tree={tempData[v]} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Tree;