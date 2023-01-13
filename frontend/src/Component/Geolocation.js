import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { useEffect, useState } from "react";
import { FormHelperText, Typography } from "@mui/material";

const Geolocation = ({
  keyGoogle,
  setbranchDetails,
  branchDetails,
  index,
  initialVal = {},
  setApiCall,
  isSubmitted,
  isrequired,
  textLabel = "",
  errorText = "",
}) => {
  const [value, setValue] = useState(initialVal);
  useEffect(() => {
    if (value["label"]) {
      handleaddress(value);
    }
  }, [value]);

  const handleaddress = async (value) => {
    const localtion = value["label"] ? value["label"] : null;
    if (localtion) {
      geocodeByAddress(localtion)
        .then((results) => {
          return getLatLng(results[0]);
        })
        .then(({ lat, lng }) => {
          const tempArray =
            branchDetails.length &&
            branchDetails.map((val, ind) => {
              if (ind === index) {
                return {
                  ...val,
                  officeGeolocation: value,
                  latitude: lat,
                  longitude: lng,
                };
              }
              return val;
            });
          setbranchDetails([...tempArray]);
          setApiCall(true);
        });
    }
  };
  useEffect(() => {
    setValue(initialVal);
  }, [initialVal]);
  return (
    <div>
      <Typography>
        {textLabel}
        {isrequired && <span className="text-danger ms-1">*</span>}
      </Typography>
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          onChange: setValue,
          placeholder: "Enter Geolocation",
          required: isrequired,
          isDisabled: isSubmitted,
          styles: {
            control: (baseStyles) => ({
              ...baseStyles,
              borderColor: errorText === "" ? "grey" : "red",
            }),
          },
        }}
        autocompletionRequest={{
          componentRestrictions: {
            country: ["in"],
          },
        }}
        apiKey={keyGoogle}
        apiOptions={{ language: "en", region: "in" }}
      />
      {errorText && (
        <FormHelperText error className="fw-700">
          {errorText}
        </FormHelperText>
      )}
    </div>
  );
};

export default Geolocation;
