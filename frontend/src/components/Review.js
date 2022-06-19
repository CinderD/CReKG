import React, {useState} from "react";
import swal from "sweetalert";
import CallApi from "./CallApi";
import $ from "jquery";
import {CaretDownOutlined, EyeOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import {Collapse} from "./SearchHelper/Collapse";
import {drawFullCircleKG, drawFullClusterKG, drawFullHierKG, drawFullPhysicsKG} from "./VisualHelper/DrawKG";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import {GetSearchConfig,searchInTable,clearViz,tdclick} from "./SearchHelper/Search";

import Logo from "./logo.png"
// import {DocRaptor} from '../docraptor'
// import {createAndDownloadDoc} from '../docraptor'


function Review () {


    
    const [content, setContent] = useState("");
    // useState accepts an initial state and returns two values:

    var ConfidentialKw,PaymentKw,DisclaimersKw,WarrantiesKw,DisputeResolutionKw,ForceMajeureKw,OtherKw = []

    // A fancy alert
    function JSalert(){ 
        swal("Congrats!", "Analysis is done!");

    }

    function getResult() {
        CallApi.getSomething()
            .then(response => {
                setContent(response.data)//response is an object
                JSalert()

        })
    }

    // function bind to button "Show Result", will return the keywords table of uploaded contract
    function showKeywords(){
        console.log(content) // content 是一个大string，每个部分用[]区分，因此要按照]做split
        
        // 将python中的list转化为7个js array,
        function getList(contentEle){
            var sevenCategories =   contentEle.split("]")

            function keywordsHandler(oneCategory){
                var Final = oneCategory.split("'")
                var list = []
                for (let i=1; i<Final.length;++i){
                    if(Final[i]!==' '){
                        if(Final[i]!== '\n'){
                            if(Final[i]!==''){
                                if(Final[i]!=='\n '){
                                    if(Final[i]!==', '){
                                        list.push(Final[i])
                                    }
                                }
                            }
                        }
                    }
                }
                return list
            }

            var ConfidentialKeywords = keywordsHandler(sevenCategories[0])
            var PaymentTermsKeywords = keywordsHandler(sevenCategories[1])
            var DisclaimersKeywords = keywordsHandler(sevenCategories[2])
            var WarrantiesKeywords = keywordsHandler(sevenCategories[3])
            var DisputeResolutionTermsKeywords = keywordsHandler(sevenCategories[4])
            var ForceMajeureKeywords = keywordsHandler(sevenCategories[5])
            var OtherKeywords = keywordsHandler(sevenCategories[6])

            // console.log(OtherKeywords[0])
            return [ConfidentialKeywords,PaymentTermsKeywords,DisclaimersKeywords,WarrantiesKeywords,DisputeResolutionTermsKeywords,ForceMajeureKeywords,OtherKeywords]
            // js不支持返回multiple values function
        }





        let matchResult = getList(content)

        // get each type of keywords
        ConfidentialKw = matchResult[0]
        PaymentKw = matchResult[1]
        DisclaimersKw = matchResult[2]
        WarrantiesKw = matchResult[3]
        DisputeResolutionKw = matchResult[4]
        ForceMajeureKw = matchResult[5]
        OtherKw = matchResult[6]


        // Create the keywords table here
        let table = document.createElement('table');
        table.id = 'keywordsTable'
        table.style.marginLeft = '0px'
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        table.appendChild(thead);
        table.appendChild(tbody);
        // Adding the entire table to the body tag
        document.getElementById('fileDisplayArea2').appendChild(table);
        table.style.display = 'none' // initially hide the table, we will display it after user press "Show List"
        // create the head of table
        let row_1 = document.createElement('tr');
        // add headings to each type of keywords colmun
        let heading_1 = document.createElement('th'); 
        heading_1.innerHTML = "Confidential Terms";
        let heading_2 = document.createElement('th'); 
        heading_2.innerHTML = "Payment Terms";
        let heading_3 = document.createElement('th'); 
        heading_3.innerHTML = "Disclaimers";
        let heading_4 = document.createElement('th'); 
        heading_4.innerHTML = "Warranties";
        let heading_5 = document.createElement('th'); 
        heading_5.innerHTML = "Dispute Resolution Terms";
        let heading_6 = document.createElement('th'); 
        heading_6.innerHTML = "Force Majeure";
        let heading_7 = document.createElement('th'); 
        heading_7.innerHTML = "Others";


        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        row_1.appendChild(heading_5);
        row_1.appendChild(heading_6);
        row_1.appendChild(heading_7);
       

        thead.appendChild(row_1);
        // create the data elements in the table
        // 5 keywords for each category, 35 keywords to show in total
        let NumOfCategory = 7; 
        let NumOfRow = 5;

        var originalContract = false // variable to get the original content without highlight (use for later keywords highlight function)

        for (let i = 0; i< NumOfRow; i++){
            let newRow = document.createElement('tr');
            newRow.id=`row_${i}`

            for (let j = 0; j < NumOfCategory-1;++j){ // bond search function to each td
                let newRowData = document.createElement('td'); 

                newRowData.id=`column_${j}_data_${i}`
                newRowData.addEventListener('click', tdclick);
                newRow.appendChild(newRowData);

            }
            tbody.appendChild(newRow);

        }

        // function to highlight keywords base on tdclick (click keywords in table => highlight in contract content)
        function highlightText(tableContent) {
            var searched=tableContent
            if (searched !== "") {
                let text = document.getElementById("fileDisplayArea").innerHTML;
                let re = new RegExp(searched,'gi'); // search for all instances, regardless of upper of low cases
                    let newText = text.replace(re, `<mark>${searched}</mark>`);
                    document.getElementById("fileDisplayArea").innerHTML = newText;
            }
        };

        // function to reset the highlighted contact
        function resetHighlight(originalContract){
            document.getElementById("fileDisplayArea").innerHTML = originalContract;
        };

        // function to stop event propogation and trigger search query & highlight
        function tdclick(e){  
            e.preventDefault()
            if (!originalContract){
                // get the original contract without highlight, use to reset the contract
                originalContract = document.getElementById('fileDisplayArea').innerHTML
            }
            if (!e) var e = window.event;                // Get the window event
            e.cancelBubble = true;                       // IE Stop propagation
            if (e.stopPropagation) e.stopPropagation();  // Other Broswers
            console.log('td clicked');
            let tableContent = this.innerHTML
            resetHighlight(originalContract)
            highlightText(tableContent)
            clearViz()
            searchInTable(tableContent)

        };

        $('#keywordsTable').show();

       // add keywords to table cells
        for (let j =0;j<matchResult.length;++j){
            var currentLen = matchResult[j].length
            if(currentLen != 0){
                if(currentLen >=5){
                    currentLen = 5 // 现在只支持五个keywords，太多了放不下
                }
                for(let i =0;i<currentLen;++i){
                    let currentData = document.getElementById(`column_${j}_data_${i}`);
                    
                    if(currentData != null){
                        currentData.innerHTML =matchResult[j][i]
                    }

                }

            }

        }

    }

    // this is the part for the PDF report & excel table download


    // function to save keywords table to an excel file
    var tableToExcel = (function() { 
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
            format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) };
        return function(table, name, filename) {
            if (!table.nodeType) table = document.getElementById(table);
            console.log(table.innerHTML)
            var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }//此时的innerHTML数据可以自己自定义 比如json转化 只要值要数据符合即可
            document.getElementById("dlink").href = uri + base64(format(template, ctx));
            document.getElementById("dlink").download = filename;
            document.getElementById("dlink").click();
        }
    });

    // download excel file
    function downloadTable(){
        var id = "keywordsTable",
        worksheetName = 'sheet',
        workName = "report.xls";
        var download = tableToExcel();
        download(id, worksheetName, workName)
    }

    // below is the part of pdf report design and download

    // image => DataUrl
    function getDataUrl(img) {
        // Create canvas
        let canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // Set width and height
        canvas.width = img.width;
        canvas.height = img.height;
        // Draw the image
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL('image/jpeg');
    }

    // put logo in the report
    function createLogo(){ 
        var img = new Image(); 
        img.src = Logo;
        return img
    }

    const img = createLogo()

    const logoURL =  getDataUrl(img)
    
    //create keywordsTable
    let keywordsTable = document.getElementById('fileDisplayArea2')

    let URLlist = []


    // get the DataURL of the returned KG picture
    function getKGpicURL(){ 

        var canvas = document.querySelector('canvas');
        let URL = canvas.toDataURL();
        return URL
    }

    function saveKG(){
        let CurrentKGURL = getKGpicURL()
        URLlist.push(CurrentKGURL)
        console.log(URLlist.length)
    }

    // this function is to design the PDF report line by line
    var generatePDF = function(){

        let element = document.getElementById('fileDisplayArea2')
        let reportArea = document.getElementById('reportArea')
        let table2 = document.getElementById('table2')
        let keywords = document.getElementById('keywordsTable')

       
        // var canvas = document.querySelector('canvas');
        let KGURL = getKGpicURL()
        var pdf = new jsPDF('', 'pt', 'a4');
        
        pdf.setFont("times")
        pdf.addImage(logoURL, "JPEG", 10, 10, 100,100, "alias1", 'SLOW');
        pdf.setFontSize(22);
        pdf.text('Analysis Rport', 240, 110);
        pdf.setFontSize(16);
        pdf.text('Keywords Table:', 20, 170);
        
    
        html2canvas(element).then(function(keywordscanvas) {


            var tableURL = keywordscanvas.toDataURL('image/jpeg', 1.0);;
            pdf.addImage(tableURL, "JPEG", 20, 180, 500, 150, "alias2", 'SLOW');
            pdf.text('Notice:', 20, 370);
            pdf.setFontSize(12);
            pdf.text('\rThis contract may lack of "Disclaimers". \rDisclaimers includes approaches that prevent disputes or enable parties to manage and resolve their disputes \rwithout intervention. Double check is recommended.', 20, 390);
            pdf.setFontSize(16);
            pdf.text('Information Graphs:', 20, 470);
            for (let i =0; i <URLlist.length;++i){
                if(i==0){
                    // let padding = i*300
                    pdf.addImage(URLlist[i], "JPEG", 0, 500, 600, 150, `alias${i}`, 'SLOW')
                }
                if(i >=3 ){
                    let padding = i*150 -300
                    pdf.addImage(URLlist[i], "JPEG", 0, 500+padding, 600, 150, `alias${i}`, 'SLOW')
                }

            }
            pdf.save('report.pdf');
 
            //方向默认竖直，尺寸ponits，格式a4[595.28,841.89]
            //addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩

            
        });       
    }

    var downloadPDF = function() {
        generatePDF()

    }

    // the below part handle the contract uploading (to the backend to do analysis)

    const [image, setImage] = useState({ preview: '', data: '' })
    const [status, setStatus] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('file', image.data)
        const response = await fetch('http://localhost:5001/image', {
            mode: 'no-cors',
            // headers:{
            //   'Access-Control-Allow-Origin': '*'
            // },
            method: 'POST',
            body: formData,
        })
        if (response) setStatus(response.statusText)

        // function to show txt
        var fileInput = document.getElementById('fileInput'),
            fileDisplayArea = document.getElementById('fileDisplayArea');
        var file = fileInput.files[0],
            reader = new FileReader();

        reader.onload = function(e) {
            console.log('testing loader')
            console.log(typeof(reader.result))
            fileDisplayArea.innerHTML = reader.result;
        };

        reader.readAsText(file);
    }

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }

        setImage(img)
    }


    return (
        <div className="flex bg-[#f2f2f2]  w-full h-3/4 ">
            <div className="block basis-1/4 grow-0 shrink-0 max-w-[25%] px-4 mt-3.5 ">
                <div className="flex flex-col  bg-white mt-3 ">

                    <div className="flex flex-row px-5 border-b-[1px] border-[#979797]/[0.1] rounded ">
                         <form className="pb-3" onSubmit={handleSubmit}>
                             <label className="">
                                 <input className="py-3.5 text-sm"  type='file' id = 'fileInput' name='file' onChange={handleFileChange}></input>

                             </label>
                             <button id='btn6' className = 'px-5 rounded-md bg-[#f2f2f2] border-[3px] text-sm' type='submit'>Submit</button>
                         </form>
                    </div>
                    <div className="bg-[#f2f2f2] py-8 w-full">

                    </div>

                    <button
                        className="flex hover:text-sky-500 flex-row align-middle items-center px-3.5 py-4 border-[#979797]/[0.1] border-b-[1px]"
                        onClick = {getResult}
                    >
                        <div className="mr-2.5"><EyeOutlined/></div>
                        <div className="ml-5">Process Review</div>
                    </button>
                    <button
                        className="flex hover:text-sky-500 flex-row align-middle items-center px-3.5 py-4 border-[#979797]/[0.1] border-b-[1px]"
                        onClick = {showKeywords}
                    >
                        <div className="mr-2.5"><EyeOutlined/></div>
                        <div className="ml-5">Show Results</div>
                    </button>
                    <button
                        className="flex hover:text-sky-500 flex-row align-middle items-center px-3.5 py-4 border-[#979797]/[0.1] border-b-[1px]"
                        onClick = {downloadPDF}
                    >
                        <div className="mr-2.5"><VerticalAlignBottomOutlined /></div>
                        <div className="ml-5">Download Report</div>
                    </button>
                    <button
                        className="flex hover:text-sky-500 flex-row align-middle items-center px-3.5 py-4 border-[#979797]/[0.1] border-b-[1px]"
                        onClick = {downloadTable}
                    >
                        <div className="mr-2.5"><VerticalAlignBottomOutlined /></div>
                        <div className="ml-5">Download Keywords Table</div>
                    </button>
                    <button
                        className="flex hover:text-sky-500 flex-row align-middle items-center px-3.5 py-4 border-[#979797]/[0.1] border-b-[1px]"
                        onClick = {saveKG}
                    >
                        <div className="mr-2.5"><VerticalAlignBottomOutlined /></div>
                        <div className="ml-5">Save KG to Report</div>
                    </button>                             
                </div>
            </div>
            <div className="block flex flex-col basis-3/4 max-w-[75%] px-4 container" >
                <div className="max-w-full  border-5 max-h-[400px]" id="table1">
                    <pre className="max-w-full max-h-full whitespace-pre-wrap overflow-x-hidden overflow-y-auto break-words text-base" id="fileDisplayArea"></pre>
                    <div id="displayZone" className="bg-[#f2f2f2] w-full h-full absolute">
                    {/* <div id="table1">
                        <pre id="fileDisplayArea"></pre>
                    </div> */}
                    <div id="table2 " className="h-full max-w-[75%]">
                        <pre id="fileDisplayArea2" ></pre>
                        <div id="viz"  className="h-1/2 w-full"></div>

                        <div id="table_wrapper"></div>
                    </div> 
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Review;