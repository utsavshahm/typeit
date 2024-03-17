import React from 'react';
import TextField from '@mui/material/TextField';

function Textbox({placeholder, required=false, name, errors, msg, register, type = 'input'}) {
  return (
    <div>
        <TextField
          variant="outlined"
          placeholder={placeholder}
          type={type}
          name={name}
          required={required}
            sx={{
                    
                    '& input:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 100px rgb(38 38 38) inset'
                      },
                    '& .MuiOutlinedInput-root': {
                        // fieldset vala normal color.. in normal state
                        '& fieldset': {
                            borderColor: '#ccc',
                            borderRadius:'10px', 
                            
                        },
                        '&:hover fieldset': {
                            borderColor: '#ccc',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#ccc',
                            borderWidth:'1px'
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#ccc',
                        
                    },
                    '& .MuiOutlinedInput-input': {
                        color: '#ccc',
                        fontFamily:'Poppins',
                        letterSpacing:3,
                        height:"15px",
                        
                    },
            }}
  
            {...register(name, {
              required: required ? msg:"",
            })}

            error={!!errors[name]}
            helperText={errors[name] ? errors[name].message : ''}
        />
      
    </div>
  );
}

export default Textbox;
