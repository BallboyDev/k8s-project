import React, { useState } from 'react'
import { Button, ButtonGroup } from "reactstrap"
import Editor from '@monaco-editor/react'
import styles from './styles.scss'

const Default = () => {

    // 1 : query / 2: repeat
    const [selection, setSelection] = useState(1)

    const [form, setForm] = useState('1')
    const [data, setData] = useState('2')
    const [result, setResult] = useState('3')

    const change = () => { }
    const empty = () => {
        console.log('ballboy empty')

        setForm(() => { return '' })
        setData(() => { return '' })
        setResult(() => { return '' })
    }
    const manual = () => { }
    const ballboy = () => { }
    const tempApi = () => { }

    return (
        <div className='Default'>
            {/* button area */}
            <div className='Default__buttons'>
                {/* left area */}
                <div className='Default__buttons__left'>
                    <ButtonGroup>
                        <Button
                            size='sm'
                            color='primary'
                            outline
                            onClick={() => {
                                setSelection(1)
                            }}
                            active={selection === 1}
                        >query</Button>
                        <Button
                            size='sm'
                            color='primary'
                            outline
                            onClick={() => {
                                setSelection(2)
                            }}
                            active={selection === 2}
                        >repeat</Button>
                    </ButtonGroup>
                </div>
                {/* right area */}
                <div className='Default__buttons__right'>
                    <Button size='sm' color='primary' outline
                        onClick={() => { console.log(styles) }}>
                        change
                    </Button>
                    <Button size='sm' color='primary' outline
                        onClick={empty}>
                        empty
                    </Button>
                    <Button size='sm' color='primary' outline
                        onClick={() => { }}>
                        ballboy
                    </Button>
                    <Button size='sm' color='primary' outline
                        onClick={() => { }}>
                        testApi
                    </Button>
                    <Button size='sm' color='primary' outline
                        onClick={() => {
                            console.log(window.location)
                        }}>
                        old version
                    </Button>
                    <Button size='sm' color='primary' outline
                        className={'Default__manual'}
                        onClick={() => { }}>
                        manual
                    </Button>
                </div>
            </div>

            {/* edit aera */}
            <div className='Default__editors'>
                <div className='Default__editors__editor'>
                    <div className='Default__half'>
                        <Editor
                            height='100%'
                            defaultLanguage='text'
                            theme='vs-dark'
                            value={form || ''}
                            onChange={(e) => { setForm(() => { return e }) }}
                            options={{
                                // title: 'title',
                                minimap: {
                                    enabled: false
                                }
                            }} />


                    </div>
                    <div className='Default__half'>
                        <Editor
                            height='100%'
                            defaultLanguage='text'
                            theme='vs-dark'
                            value={data || ''}
                            onChange={(e) => { setData(() => { return e }) }}
                            options={{
                                // title: 'title',
                                minimap: {
                                    enabled: false
                                }
                            }} />


                    </div>
                </div>
                <div className='Default__editors__editor'>
                    <Editor
                        height='100%'
                        defaultLanguage='text'
                        theme='vs-dark'
                        value={result || ''}
                        onChange={(e) => { setResult(() => { return e }) }}
                        options={{
                            // title: 'title',
                            minimap: {
                                enabled: false
                            }
                        }} />


                </div>
            </div>
        </div>
    )
}

export default Default