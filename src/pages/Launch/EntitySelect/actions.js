  // Send business information to the backend

import { toast } from "react-hot-toast";


export const handleBusinessInfo = async (requiredLaunchInfo, launchCode, info) => {
    // Check if business names or objectives exists
    let existingNames = await info?.viewBusinessNames(requiredLaunchInfo);
    let existingObjectives = await info?.viewBusinessObjectives(requiredLaunchInfo);

    let namesExists = existingNames?.data?.businessNames;
    let objectivesExists = existingObjectives?.data?.businessObjects;

   let condition = false
    // Navigate if business names and objectives exist
    if (namesExists && objectivesExists) condition = true ;

    const requiredBusinessNamesData = {
      launchCode: launchCode,
      businessNames: {
        businessName1: info?.businessNames[0],
        businessName2:  info?.businessNames[1],
        businessName3:  info?.businessNames[2],
        businessName4:  info?.businessNames[3],
      },
    };

    const requiredBusinessObjectives = {
      launchCode: launchCode,
      businessObjects: {
        businessObject1:  info?.selectedObjectives[0],
        businessObject2:  info?.selectedObjectives[1] || "null",
        businessObject3:  info?.selectedObjectives[2] || "null",
        businessObject4:  info?.selectedObjectives[3] || "null",
      },
    };

    // Update if business names exist, add if otherwise
    const businessNamesResponse = namesExists
      ? await info?.updateBusinessNames(requiredBusinessNamesData)
      : await info?.addBusinessNames(requiredBusinessNamesData);
console.log(businessNamesResponse)
    // Update if business objectives exist, add if otherwise
    const businessObjectivesResponse = objectivesExists
      ? await info?.updateBusinessObjectives(requiredBusinessObjectives)
        : await info?.addBusinessObjectives(requiredBusinessObjectives);
        console.log(businessObjectivesResponse)

    let error = businessNamesResponse?.error;
    let error2 = businessObjectivesResponse?.error;

    if (error) {
      toast.error(error.data.message);
      toast.error(error2.data.message);
    }
   return condition
  };