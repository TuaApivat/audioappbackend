import React, { useState,useEffect } from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import '../Component/musicliststy.css'
import axios from 'axios';

const MusicListCom = () => {

    const [musics,setmusics] = useState([])

    useEffect(() => {
       //if(musics.lenght == 0){
          fetchmusics();
       //}
    },[]);

    async function fetchmusics(){
        var res = await axios.get('/api/getMusic')
        if(res.data.result == 'success'){
            setmusics(res.data.querydata)
        }
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
  };


  return (
    <>
    <Container style={{width:'90vw'}}>
       <Row style={{width:'100%'}}>
            {musics.map((item,index) =>
             (
                <>
                  <Col xs='4'> 
                    <div className='musiccont'>
                     {item['name']} 
                    </div>
                  </Col>
                </>
             ))
        }
       </Row>
    </Container>
    </>
  );
};

export default MusicListCom;