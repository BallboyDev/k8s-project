window.onload = () => {
    console.log('ballboy\'s development tool ( ver 3.0 )');
    console.log('made by Ballboy Seung Woo Yang');
    console.log('Copyleft ○ 2021 All Wrongs reserved');

    // radio 버튼 상태 확인
    radioStatus = () => {
        for (let i = 0; i < this.document.getElementsByClassName('radio').length; i++) {
            if (this.document.getElementsByClassName('radio')[i].checked === true) {
                return this.document.getElementsByClassName('radio')[i].value
            }
        }

        return 'error'
    }

    // 실행버튼, change 버튼 클릭시 실행
    this.document.getElementById('change').onclick = () => {
        let data = ''; let form = ''; let trans_list = ''; let result = '';
        switch (this.radioStatus()) {
            case 'query':
                let index = 0
                form = this.document.getElementById('form').value.replace(/[\[](.*?)[\]][\[](.*?)[\]]==>(.*?): /gi, '')
                data = this.document.getElementById('data').value.replace(/[\[](.*?)[\]][\[](.*?)[\]]==>(.*?): /gi, '').split(',').map((v1, i) => {

                    if ((v1.indexOf('(') > -1 && v1.indexOf(')')) || (v1.indexOf('{') > -1 && v1.indexOf('}'))) {
                        let colName = ''; let colType = ''; let value = '';
                        value = v1
                        if (v1.indexOf('(') > -1 && v1.indexOf(')')) {
                            let type = v1.match(/[(](.*?)[)]/gi)
                            colType = type[type.length - 1]
                            value = value.replace(colType, '')
                        }
                        if (v1.indexOf('{') > -1 && v1.indexOf('}')) {
                            let name = v1.match(/[{](.*?)[}]/gi)
                            colName = name[name.length - 1]
                            value = value.replace(colName, '')
                        }

                        return {
                            colName: colName.replace(/[{]|[}]/gi, '') || `colName${i}`,
                            colType: colType.replace(/[(]|[)]/gi, '') || `colType${i}`,
                            value: value.trim()
                        }
                    } else {
                        return {
                            colName: `colName${i}`,
                            colType: `colType${i}`,
                            value: v1.trim()
                        }
                    }

                }).filter((v) => { return (v || '') !== '' })

                form = form.split('').map((v) => {
                    if (v === '?') {
                        return index < data.length ? `#{${data[index++].colName}}` : v
                    } else {
                        return v
                    }
                }).join('')

                data.map((v) => {
                    let reg1 = new RegExp(`#{${v.colName}}`, 'gi') // 
                    if (['NUMBER', 'DECIMAL', 'INT', 'INTEGER', 'FLOAT', 'BIT', 'TIUNYINT', 'SMALLINT', 'NUMERIC'].findIndex((t) => { return v.colType.toUpperCase() === t }) > -1) {
                        form = form.replace(reg1, `${v.value}`)
                    } else {
                        form = form.replace(reg1, `'${v.value}'`)
                    }

                })

                this.document.getElementById('result').value = form
                break;
            case 'repeat':
                form = this.document.getElementById('form').value;
                data = this.document.getElementById('data').value.split('\n').map((v1, i1) => {
                    return {
                        index: i1,
                        values: v1.split(/ |\t/gi).filter((v) => { return v !== '' }).map((v2, i2) => {
                            return { [`value${i2}`]: v2 }
                        })
                    }
                })

                data.map((v1, i1) => {
                    let temp = form.replace(/#{i}/gi, i1)
                    v1.values.map((v2, i2) => {
                        let reg2 = new RegExp(`#{(${i2})}`, 'gi')
                        temp = temp.replace(reg2, v2[`value${i2}`])
                    })
                    trans_list = `${trans_list}${temp}\n`
                })

                this.document.getElementById('result').value = trans_list
                break;

            case 'error':
                console.error('에러 발생...???!!!! 왜지?!?!!!???!!')
                console.error('이거 출력되면... 승우한테 문의 하.... 지 말아주세요')
                console.error('저도 이게 어떻게 돌아가는지 지금은 잘.... 기억이 안날꺼 같아요.......')
                console.error('인간적으로 이게 발생 할 수가... 있나?!!?!??!?!??!?!')
                break;
        }
    }

    // menual 버튼 클릭시 실행
    // 예시 data와 form을 입력, 사용방법을 출력
    this.document.getElementById('menual').onclick = () => {
        switch (this.radioStatus()) {
            case 'query':
                this.document.getElementById('form').value = `[DEBUG][2021-04-02 16:57:20]==>  Preparing: /* 회계기수 정보 조회 단건*/ SELECT MAX(G.GISU) AS GISU , MAX(G.FR_DT) AS FR_DT , MAX(G.TO_DT) AS TO_DT , G.RMK_DC , E.KOR_NM FROM erp_1234.SGISU G LEFT OUTER JOIN erp_1234.SEMP E ON E.CO_CD = G.CO_CD AND E.EMP_CD = G.INSERT_ID WHERE G.CO_CD = ? AND ? BETWEEN G.FR_DT AND G.TO_DT `
                this.document.getElementById('data').value = `[DEBUG][2021-04-02 16:57:20]==> Parameters: 2000(String), 20210402(String)`
                this.document.getElementById('result').value = `< query 변환 사용법 >\n1. form 입력칸(좌상단)에 쿼리를 입력한다.\n2. data 입력칸(좌하단)에 데이터를 입력한다.\n3. change 버튼을 클릭한다.\n\nform칸에 입력된 쿼리에서 '?' 문자는 쿼리 변환시 data칸에 입력된 데이터를 입력 라인 순서대로 변환됩니다.\n\nform칸에 Mybatis와 같이 #{colName} 형식으로 입력시에는 data칸에 입력된 데이터의 colName에 맞춰 변환이 이루어 집니다.\n\n----------form - 예시1---------- \nSELECT * \n  FROM TEMP_TABLE T \n WHERE CO_CD = ?\n   AND EMP_CD = ?\n   AND DIV_CD = ?\n\n----------data - 예시1---------- \n1000(String), 2000(String), 3000(String)\n\n\n\n----------form - 예시2---------- \nSELECT * \n  FROM TEMP_TABLE T \n WHERE CO_CD = #{coCd}\n   AND EMP_CD = #{divCd}\n   AND DIV_CD = #{empCd}\n\n----------data - 예시2---------- \n1000(String){coCd}, 2000(String){divCd}, 3000(String){empCd}\n\n---------result--------- \nSELECT * \n  FROM TEMP_TABLE T \n WHERE CO_CD = '1000'\n   AND EMP_CD = '2000'\n   AND DIV_CD = '3000'`
                break;
            case 'repeat':
                this.document.getElementById('data').value = '1-1\t1-2\t1-3\t1-4\n2-1\t2-2\t2-3\t2-4\n3-1 3-2 3-3 3-4\n4-1 4-2 4-3 4-4\n5-1 5-2 5-3 5-4\n6-1 6-2 6-3 6-4';
                this.document.getElementById('form').value = '-- #{i} 번째 반복 -- \nline1 = #{0}\nline2 = #{1}\nline3 = #{2}\nline4 = #{0}';
                this.document.getElementById('result').value = '< 코드 반복 작성 사용법 >\n1. form 입력칸(좌삳단)에 반복 작성될 코드의 form을 입력한다.\n2. data 입력칸(좌하단)에 반복할 횟수만큼의 row에 데이터 입력한다.\n3. change 버튼을 누른다.\n\nform칸에 작성된 코드에서 반복때마다 다른 값이 들어가야 되는 코드는 #{x}로 작성한다.\n코드가 작성되며 #{x}는 data칸에 작성된 데이터를 기반으로 자동으로 치환되어\nresult 칸에 출력된다.\n#{i}는 반복되는 인덱스를 출력한다.\n\n----------예시---------- \n--- form칸\n반복될 코드 #{i} : #{0} / #{1}\n\n--- data칸\na1 b6\na2 b7\na3 b8\na4 b9\na5 b0\n\n--- 결과값\n반복될 코드 0 : a1 / b6\n반복될 코드 1 : a2 / b7\n반복될 코드 2 : a3 / b8\n반복될 코드 3 : a4 / b9\n반복될 코드 4 : a5 / b0'
                break;
        }

    }
    // empty 버튼 클릭시 실행
    // 모든 textarea 내용 삭제
    this.document.getElementById('empty').onclick = () => {
        this.document.getElementById('data').value = '';
        this.document.getElementById('form').value = '';
        this.document.getElementById('result').value = '';
    }

}