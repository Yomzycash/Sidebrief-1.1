import React, { useState, UseEffect } from 'react';

import {
    Container,
    TopContainer,
    Left,
    Right,
    DetailWrapper,
    DetailContainer,
    CardContainer,
    Image,
    DocumentContainer,
    DocumentWrapper,
    Title,
    SubText,
    Body,
    Loader,
    EmptyContainer
} from "./styles"
import { ReactComponent as UploadIcon  } from 'asset/svg/Upload.svg';
import { useLocation } from "react-router-dom";
// import {completed}  from 'asset/images/completed';
import { CommonButton } from 'components/button';
import StaffDocumentModal from "components/modal/StaffDocumentModal";
import KYCFileUpload from 'components/FileUpload/KYCFileUpload';
import { handleError } from "utils/globalFunctions";
import { toast } from 'react-hot-toast';

const DetailDocument = () => {
    const [open, setOpen] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState([]);
    const [cardAction, setCardAction] = useState("")
    const location = useLocation();
    const path = location.pathname.includes('staff');
    let data = [
        {
            "title": "Passport",
            "text": "My passport description"
        },
        {
            "title": "NIN",
            "text": "My National Identification Number description "
        },
        {
            "title": "Photo",
            "text": "Photo description"
        },
        {
            "title": "Receipt",
            "text": "Payment receipt description"
        }
    ]

  
  
  const handleAddDocument = () => {
    setOpen(true);
    // setCardAction("add");
    // if(data) {
    //     setOpen(true);
    // }
  }
  return (
    <>
        {path ? (
            <Container>
                <TopContainer>
                    <Left>
                        <h3>
                            {/* <span>
                                <Image src={completed} alt=""/>
                            </span> */}
                            Registration Completed
                            <span>
                                ({data.length} Document{data.length === 1 ? '' : 's'} added)
                            </span>
                        </h3>
                        <SubText>
                            Your business registration has 
                            been successfully completed, you can now upload 
                            necessary documents.
                        </SubText>
                    </Left>
                    <Right>
                        <CommonButton
                            text="Add New Document"
                            action={handleAddDocument}
                        />
                    </Right>
                </TopContainer>
                {data.length === 0 ? (
                    <EmptyContainer>
                        <h5>No Document Added</h5>
                    </EmptyContainer>
                ) : (
                    <DocumentContainer>
                        {data.map((doc, index) => (
                            <>
                                <DocumentWrapper key={index}  onClick={""}>
                                    <Title>{doc.title}</Title>
                                    <SubText> {doc.text} </SubText>
                                    <KYCFileUpload/>
                                </DocumentWrapper>
                                
                            </>
                        
                        ))}
                    </DocumentContainer>
                )}
            
            </Container>
        ) : (
            <Container>
                
                <CardContainer>
                    {data.map((doc, index) => (
                        <>
                            <DocumentWrapper key={index}>
                            <Title>{doc.title}</Title>
                            <SubText> {doc.text} </SubText>
                        </DocumentWrapper>
                        </>
                        
                    ))}
                </CardContainer>
               
            </Container>
        )}
        <StaffDocumentModal
            setOpen={setOpen}
            open={open}
            cardAction={cardAction}
        />
    </>
    
   
  )
}

export default DetailDocument;