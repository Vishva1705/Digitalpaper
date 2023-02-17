import React, { useState, useEffect } from "react";
import axios from 'axios';
import Aos from 'aos';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import './Navbar.css'
import { NavLink, Link, BrowserRouter, Routes, Route, useNavigate, useHistory } from 'react-router-dom'
import logo from './Assest/logo.png'
import Page1 from './Assest/Page1.jpg'
import Page2 from './Assest/Page2.jpg'
import Page3 from './Assest/Page3.jpg'
import Page4 from './Assest/Page4.jpg'
import Page5 from './Assest/Page5.jpg'
import Page6 from './Assest/Page6.jpg'
import Page7 from './Assest/Page7.jpg'
import Page8 from './Assest/Page8.jpg'
import './Styles/Home.css'
import Sharing from "../Sharing";
import { Document, Page, pdfjs } from "react-pdf";
import { saveAs } from "file-saver";
import { PDFDocument } from "pdf-lib";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Font } from "@react-pdf/renderer";



pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Load font files in virtual file system
pdfMake.vfs["Latha.ttf"] = "BASE64 ENCODED DATA FOR Latha.ttf";
pdfMake.vfs["Latha-Bold.ttf"] = "BASE64 ENCODED DATA FOR Latha-Bold.ttf";

pdfMake.fonts = {
  Latha: {
    normal: "Latha.ttf",
    bold: "Latha-Bold.ttf",
    italics: "Latha.ttf",
    bolditalics: "Latha-Bold.ttf",
  },
};

Font.register({
  family: "Noto Sans Tamil",
  src: "https://fonts.gstatic.com/s/notosanstamil/v9/VemwRoJ0vKv7oKtlLXbEdYhNlQzLSKj_8Q.woff2",
});

const Home = () => {

  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }


  const today = new Date();
  const date = today.setDate(today.getDate());
  const defaultValue = new Date(date).toISOString().split('T')[0]

  // select Date 
  const [selectdate, setSelectedDate,] = useState();
  console.log(selectdate);

  //Get Today news
  const [getdata, setGetData] = useState([]);
  console.log(getdata);

  //selected news 
  const [selectnews, setSelectnews] = useState([]);
  console.log(selectnews);

  //selected pages
  const [Pages, SetPages] = useState([]);
  console.log(Pages);



  //download news
  const handleCaptureClick = async () => {
    const canvas = await html2canvas(document.getElementById('download'));
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, 'download.png', 'image/png');
  };

  // Convert text to speech
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ta-IN'; // Set language to Tamil
    speechSynthesis.speak(utterance);
  }


  useEffect(() => {
    axios.get("http://localhost:3100/getnews")
      .then((res) => {
        setGetData(res.data)
        console.log(res.data);
      });
    Aos.init();
  }, []);


  const news = async () => {
    await axios.post("http://localhost:3100/postnews", { Date: selectdate })
      .then((res) => {
        setGetData(res.data.response)
        console.log(res.data.response, 'test1');

      })
  };

  const pageselect = async () => {
    await axios.post("http://localhost:3100/pagenews", { Date: selectdate, Pagename: Pages })
      .then((res) => {
        setGetData(res.data.response)
        console.log(res.data.response, 'test3');

      })
  };


  const getid = async (e) => {
    await axios.post("http://localhost:3100/news", { id: e })
      .then((res) => {
        setSelectnews(res.data.response)
        console.log(e, 'test1');
        console.log(res, 'test2');

      })
  };

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);


  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleDownload = (pdfDocGenerator) => {
    pdfDocGenerator.getBlob((blob) => {
      saveAs(blob, "news.pdf");
    });
  };

  const handleGeneratePdf = () => {
    const pdfContent = {
      content: selectnews.map((item, index) => [
        {
          text: item.head_kicker,
          style: "header",
        },
        {
          text: item.head,
          style: "subheader",
        },
        {
          text: item.head_deck,
          style: "subheader",
        },
        {
          text: `${item.byline} - ${item.dateline}`,
          style: "byline",
        },
        {
          text: item.body,
          style: "body",
        },
        {
          text: "\n\n",
        },
      ]),
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          margin: [0, 0, 0, 10],
          font: 'Latha'
        },
        subheader: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 5],
          font: 'Latha'
        },
        byline: {
          fontSize: 12,
          italics: true,
          margin: [0, 5, 0, 10],
          font: 'Latha'
        },
        body: {
          fontSize: 12,
          margin: [0, 0, 0, 10],
          font: 'Latha'
        },
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(pdfContent);
    pdfDocGenerator.getBlob((blob) => {
      saveAs(blob, "news.pdf");
    });
  };

  // const sharingnews = selectnews.map((item, index) => {
  //   return (
  //     <>
  //       <div key={index}>
  //         <h2><strong>{item.head_kicker}</strong></h2>
  //         <br />
  //         <h3>{item.head}</h3>
  //         <br />
  //         <h4>{item.head_deck}</h4>
  //         <h5>{item.byline}</h5>
  //         <h5>{item.dateline}</h5>
  //         <br />
  //         <p>{item.body}</p>

  //       </div>
  //     </>
  //   )
  // })
  const myVariable = 'welcome';

  // const gettingdata =getdata.map((item, index) => {

  // const imageUrl = `file://${item.path}`;

  //   return (
  //     <>
  //       <ul style={{ display: 'block' }} key={index} >
  //         <li>
  //           <img src={imageUrl} onError={(e) => console.log(e)} />
  //           <span><a onClick={(e) => getid(item.id)}> {item.head || item.head_kicker} </a></span> 
  //         </li>
  //       </ul>
  //     </>
  //   )
  // })

  return (
    <>
      <div>
        <ul>
          <li>
            <input type="date" id="Date" onChange={(e) => setSelectedDate(e.target.value)}
              min="2023-01-01" max={defaultValue} defaultValue={defaultValue} onSelect={news}
              style={{ border: 'none', boxShadow: 'none', background: 'none' }} />
          </li>
        </ul>
      </div>


      <div className='cards' style={{ margin: '20PX' }} >
        <img src={Page1} style={{ width: '12%', height: '250px' }} onMouseOver={(e) => SetPages('Front')} onClick={pageselect}></img>
        <img src={Page2} style={{ width: '12%', height: '250px' }} onMouseOver={(e) => SetPages('2nd')} onClick={pageselect}></img>
        <img src={Page3} style={{ width: '12%', height: '250px' }} onMouseOver={(e) => SetPages('3rd')} onClick={pageselect}></img>
        <img src={Page4} style={{ width: '12%', height: '250px' }} onMouseOver={(e) => SetPages('4th')} onClick={pageselect}></img>
        <img src={Page5} style={{ width: '12%', height: '250px' }} onMouseOver={(e) => SetPages('5th')} onClick={pageselect}></img>
        <img src={Page6} style={{ width: '12%', height: '250px' }} onMouseOver={(e) => SetPages('Back')} onClick={pageselect}></img>
        <img src={Page7} style={{ width: '12%', height: '250px' }} onMouseEnter={(e) => SetPages('7th')} onClick={pageselect}></img>
        <img src={Page8} style={{ width: '12%', height: '250px' }}></img>
      </div>

      <div class="sidebar">
        {
          getdata.map((item, index) => {
            return (
              <>
                <ul style={{ display: 'block' }} key={index} >
                  <li>
                    <img src={item.Image} onError={(e) => console.log(e)} alt='my image' />

                    <span><a onClick={(e) => getid(item.id)}> {item.head || item.head_kicker} </a></span>
                  </li>
                </ul>
              </>
            )
          })
          // gettingdata
        }
        {/* <img src={require("C:/Users/51112/Downloads/New folder/new.jpg")} /> */}

      </div>

      <div class="content">

        {/* {sharingnews} */}
        <div id="download">
          {
            selectnews.map((item, index) => {
              return (
                <>
                  <div key={index}>

                    <h2><strong>{item.head_kicker}</strong></h2>
                    <br />
                    <h3>{item.head}</h3>
                    <br />
                    <h4>{item.head_deck}</h4>
                    <h5>{item.byline}</h5>
                    <h5>{item.dateline}</h5>
                    <br />
                    <p>{item.body}</p>
                    <div>
                      <button onClick={() => speak(item.body)}>convert</button>
                      <button onClick={handleGeneratePdf}>Generate PDF</button>
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>

        <div className="selectednews">
          <ul >
            <br />
            <li><button onClick={handleCaptureClick}>Download</button></li>
            <li><button>speech</button></li>
          </ul>

          {/* <a> {<Sharing data={sharingnews} />} </a> */}

          <Link to={`/sharing/${myVariable}`}>
            goto
          </Link>
        </div>

      </div>
    </>

  )
}

export default Home