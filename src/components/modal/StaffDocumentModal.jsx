import React, {useState, useEffect} from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import TagInput from "components/input/TagInput";
import { DetailedSection } from "containers/Checkout/InfoSection/style";
import Modal1 from "layout/modal1";
import { useForm } from "react-hook-form";
import {StaffDocumentSchema } from "utils/config"
import { InputWithLabel } from 'components/input';
import KYCFileUpload from 'components/FileUpload/KYCFileUpload';
const StaffDocumentModal = ({
    cardAction,
    setCardAction,
    open,
    setOpen,
    disableAll,
    documentInfo,
    title,
    submitAction,
    loading
    }) => {
        
    
    const [ disable, setDisable] = useState(disableAll);

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(StaffDocumentSchema)
    }) 

    useEffect(() => {
        if(cardAction === "edit" && documentInfo){
            setValue("name", documentInfo.name, {
                shouldValidate: true,
            });

            setValue("description", documentInfo.description, {
                shouldValidate: true
            })
        } else {
            setValue("name", "");
            setValue("description", "");
        }
    }, [documentInfo])
    return (
        <Modal1
            handleSubmit={handleSubmit}
            submitAction={submitAction}
            open={open}
            title={"Add New Document"}
            setOpen={setOpen}
            disable={disable}
            setDisable={setDisable}
            cardAction={cardAction}
            loading={loading}
        >
            <DetailedSection>
                <InputWithLabel 
                    label="Document Name"
                    labelStyle="input-label"
                    placeholder = "Enter Document Name"
                    type="text"
                    name="name"
                    inputClass="input-class"
                    containerStyle="input-container-class"
                    errorMessage={errors.name?.message}
                    disable={disable}

                />
            </DetailedSection>

            <DetailedSection>
                <InputWithLabel 
                    label="Document Description"
                    labelStyle="input-label"
                    placeholder = "Enter Document Description"
                    type="text"
                    name="description"
                    inputClass="input-class"
                    containerStyle="input-container-class"
                    errorMessage={errors.description?.message}
                    disable={disable}
                />
            </DetailedSection>

            <DetailedSection>
                <KYCFileUpload
                    TopText="Upload Document"
                    BottomText="Kindly esnure image is not larger than 3MB"
                    errorMsg={errors.fileupload?.message}
                />
            {/* <>
                  <FiUpload /> Drag & drop, or browse
                </> */}
            </DetailedSection>
        </Modal1>
    )
}

export default StaffDocumentModal