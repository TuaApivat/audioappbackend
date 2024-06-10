import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  FormText,
} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

const MusicForm = () => {
  const [musicName, setMusicName] = useState('');
  const [artist, setArtist] = useState('');
  const [musicInfo, setMusicInfo] = useState('');
  const [musicType, setMusicType] = useState('');
  const [musicFile, setMusicFile] = useState(null);
  const [musicCover, setMusicCover] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const data = formJson;

    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    }
    var res = await axios.post('/api/Music/upload',data,config)
        if(res.data.result == 'success'){
            alert(res.data.result)
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="12">
          <h2 className="text-center mb-4">Music Form</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="musicName">Music Name *</Label>
              <Input
                type="text"
                name="musicName"
                id="musicName"
                placeholder="Enter music name"
                value={musicName}
                onChange={(e) => setMusicName(e.target.value)}
                required
                valid={isSubmitted && musicName !== ''}
                invalid={isSubmitted && musicName === ''}
              />
              <FormFeedback>Music name is required</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="artist">Artist *</Label>
              <Input
                type="select"
                name="artist"
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
              >
                <option value="">Select artist</option>
                <option value="artist1">Artist 1</option>
                <option value="artist2">Artist 2</option>
                <option value="artist3">Artist 3</option>
              </Input>
              <FormFeedback>Artist is required</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="musicInfo">Music Info</Label>
              <Input
                type="textarea"
                name="musicInfo"
                id="musicInfo"
                placeholder="Enter music information"
                value={musicInfo}
                onChange={(e) => setMusicInfo(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="musicType">Music Type *</Label>
              <Input
                type="select"
                name="musicType"
                id="musicType"
                value={musicType}
                onChange={(e) => setMusicType(e.target.value)}
                required
              >
                <option value="">Select music type</option>
                <option value="jazz">jazz</option>
                <option value="pop">pop</option>
                <option value="classic">classic</option>
              </Input>
              <FormFeedback>Music type is required</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="musicFile">Music File *</Label>
              <Input
                type="file"
                name="musicFile"
                id="musicFile"
                accept=".wav,.mp3"
                onChange={(e) => setMusicFile(e.target.files[0])}
                required
              />
              <FormText color="muted">Upload music file</FormText>
            </FormGroup>

          
            <FormGroup>
              <Label for="musicCover">Music Cover</Label>
              <Input
                type="file"
                name="musicCover"
                id="musicCover"
                accept=".gif,.jpg,.jpeg,.png"
                onChange={(e) => setMusicCover(e.target.files[0])}
              />
              <FormText color="muted">Upload music cover image</FormText>
            </FormGroup>
        

            <Button color="primary" block>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MusicForm;