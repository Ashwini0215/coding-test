class payloadController {

  // 200 or 400 Response
  static transformed(req, res) {
     const { payload, referenceData } = req.body;
     if (!payload || !referenceData )
      {return res.status(400).json('Bad Request');}
      payloadController .iteratePayload(payload.value, referenceData);
     return res.status(200).json(payload);
  }
    // Iterate the payload to find if it is a string or an array, if String , replace the reference data
    static iteratePayload(values, refData) {
      values.forEach(key => {
       if (key.valueType === 'string') {
        key.value = payloadController .transformPayload(key.value, refData);
      }
      else if (key.valueType === 'array') {
       payloadController .iteratePayload(key.value, refData);
      }
     })
    }
    // Referencedata replacement
   static transformPayload (value, refData){
    Object.keys(refData).forEach(key => {
        value = value.replace(`{${key}}`, refData[key]);
    })
    return value;
  }

}

module.exports = payloadController ;
