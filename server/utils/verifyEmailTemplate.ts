interface VerifyEmailTemplateParams {
  fullName: string;
  url: string;
}

const verifyEmailTemplate = ({ fullName, url }: VerifyEmailTemplateParams): string => {
  return `
<p>Dear ${fullName}</p>    
<p>Thank you for registering Movies.</p>   
<a href="${url}" style="color:black; background: orange; margin-top: 10px; padding: 20px; display: block;">
  Verify Email
</a>
`;
};

export default verifyEmailTemplate;
