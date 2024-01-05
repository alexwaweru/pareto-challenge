export interface ValueOption {
    id?: string;
    label?: string;
  }
  
  export interface SelectOption {
    label: string;
    value: string;
  }
  
  export interface FormFieldProps {
    // common options
    name: string;
    control: any;
    label: string;
    placeholder?: string;
    required?: boolean;
    setValue?: any;
    helperText?: string;
  
    // text field options
    type?: string;
    multiline?: boolean;
    rows?: number;

    // number field options
    min?: number;
    max?: number;
    
    // select field options
    options?: SelectOption[];
    multiple?: boolean;
    
    // date field options
    disableFuture?: boolean;
    disablePast?: boolean;
    shouldDisableDate?: (value: any) => boolean;
  }
  
  export type FormFieldTypes = 'text'| 'date'| 'number'| 'rich-text'| 'select'| 'switch';
  