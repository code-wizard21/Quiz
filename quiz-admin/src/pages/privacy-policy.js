import { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { AppBar, Box, Card, CardContent, Container, Grid, Toolbar } from "@mui/material";
import { GuestGuard } from "../components/authentication/guest-guard";
// import { ProductFeatures } from "../components/authentication/product-features";
import { Logo } from "../components/logo";
import { useSettings } from "../contexts/settings-context";
import { useAuth } from "../hooks/use-auth";
import { gtm } from "../lib/gtm";

const PrivacyPolicy = () => {
  const { platform } = useAuth();
  const { settings } = useSettings();

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Privacy Policy | QuizMobb</title>
      </Head>
      <AppBar elevation={0}
sx={{ backgroundColor: "background.paper" }}>
        <Container maxWidth="md">
          <Toolbar disableGutters
sx={{ height: 64, textAlign: "center" }}>
            <h1
              style={{
                margin: "auto",
                color: settings.theme === "light" ? "#000" : "#fff",
              }}
            >
              Privacy Policy
            </h1>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flexGrow: 1,
          pt: "64px",
        }}
      >
        <Box sx={{ py: 9 }}>
          <Container maxWidth="md">
            <Grid
              container
              spacing={6}
              style={{
                justifyContent: "center",
              }}
            >
              <Grid
                item
                md={10}
                sx={{
                  display: {
                    md: "block"
                  },
                }}
                xs={12}
              >
                <Card>
                  <CardContent>
                    In conducting our business, Lobang App (hereunder defined) may collect, use,
                    disclose or otherwise process Personal Data relating to you. <br />
                    <br />
                    This Privacy Policy, together with our Terms of Use sets out how we comply with
                    our obligations under the Personal Data Protection Act 2012 of Singapore
                    (“PDPA”).
                    <br />
                    <br />
                    Please read the following carefully to understand our views and practices
                    regarding your Personal Data, and how we will treat such Personal Data.
                    <br />
                    <br />
                    In this Data Privacy Policy, “Personal Data” refers to any data, whether true or
                    not, about an individual who can be identified (a) from that data; or (b) from
                    that data and other information to which we have or are likely to have access,
                    including data in our records as may be updated from time to time.
                    <br />
                    <br />
                    By visiting our website or using our services, you are accepting and agreeing to
                    our practices described in this Privacy Policy. If you are under 18, please do
                    not send any personal data about yourself to us:
                    <br />
                    <br />
                    1. COLLECTION AND PROCESSING OF PERSONAL DATA
                    <br />
                    <br />
                    We may collect Personal Data (which may include sensitive Personal Data) when
                    you provide it to us. Generally, we collect Personal Data in the following ways:
                    <br />
                    <br />
                    when you submit any form, including but not limited to consent and order forms,
                    as well as customer inquiry forms or other forms relating to any of our
                    services;
                    <br />
                    <br />
                    when you enter into any agreement or provide documentation or information in
                    respect of your interactions with us, or when you use our services;
                    <br />
                    <br />
                    when you interact with our staff, either directly or indirectly through referral
                    intermediaries <br />
                    <br />
                    when you request that we contact you or request that you be included in an email
                    or other mailing list;
                    <br />
                    <br />
                    when we seek information about you and receive your Personal Data in connection
                    with us, including our services, for example, from business partners, public
                    agencies, referral intermediaries and the relevant authorities; and/or
                    <br />
                    <br />
                    when you have chosen to provide or submit your Personal Data to us. <br />
                    <br />
                    Examples of such Personal Data you may provide to us include (depending on the
                    nature of your interaction with us) your name and identification information
                    such as your NRIC, passport or other identification), contact information such
                    as your address, email address or telephone number, nationality, gender, date of
                    birth, marital status, photographs and other audio-visual information, and any
                    other information which you have provided us (including financial information
                    such as credit card numbers, debit card numbers or bank account information), in
                    any forms you may have submitted to us, or via other forms of interaction with
                    you.
                    <br />
                    <br />
                    If you provide us with any Personal Data relating to a third party (e.g.
                    information of your spouse, children and/or parents), by submitting such
                    information to us, you represent to us that you have obtained the consent of the
                    third party to provide us with their Personal Data for the respective purposes.
                    We may also use various technologies on our websites which may lead to
                    information being automatically collected and stored by us, including
                    device-specific and other technical information about your mobile or computer
                    device such as the hardware model, operating system version, browser type and
                    version, Internet Protocol (IP) address, advertising identifier, unique
                    application identifiers, unique device identifiers, browser type, language,
                    wireless network, and mobile network information. This information does not
                    generally, but may, contain your Personal Data, and we, and our data.
                    <br />
                    <br />
                    2. INFORMATION COLLECTED VIA THE APP
                    <br />
                    <br />
                    Depending on your device, our App may request certain permissions that allow it
                    to access your device data. By default, you must grant these permissions before
                    the respective information can be accessed. Once the permission has been given,
                    you can revoke it at any time and it is your responsibility to monitor/adjust
                    them in accordance with your preferences. In order to revoke these permissions,
                    you may refer to the device settings. The exact procedure for controlling app
                    permissions may be dependent on your device and software. Please note that the
                    revoking of such permissions might impact the proper functioning of the App. If
                    you grant any of the permissions listed below, your information may be collected
                    by the App:
                    <br />
                    <br />
                    Location: This permission is used to grant the App access to transmit your
                    device’s location, using Google’s location services to obtain your location when
                    you using the App. This is done to provide the closest addresses based on your
                    location. At the same time, IP address is also obtained from the app so that the
                    app is able to localise the content based on your location. When you close the
                    App, all location transmissions are cut – Lobang App will not be able to access
                    your location.
                    <br />
                    <br />
                    Camera: This permission is needed to allow the App to use your camera when
                    taking pictures or video from within the App for video consultation purposes.
                    During this process, the App will enable your camera and the screen will change
                    on your device so that you are aware of the recording. Once you have close the
                    App, there are no functions used to access your camera.
                    <br />
                    <br />
                    Microphone: Almost identical to the camera permission, the microphone permission
                    is requested so that the App can record audio during the video consultation
                    process. Your microphone cannot be accessed once you have close the App.
                    <br />
                    <br />
                    Storage: The App requests access to your device’s storage so that it can access
                    the images and videos taken by our doctors that resides in Lobang App’s server.
                    There is also an option to upload images from your device instead of having to
                    take the picture from within the App itself. This permission gives us the
                    ability to access those images – we do not access any other data saved on your
                    device. Like all other permissions the App requests, access to your device’s
                    storage is not permitted once you have closed the app.
                    <br />
                    <br />
                    3. PURPOSES OF USE
                    <br />
                    <br />
                    All Personal Data and other information collected may be used by us for any of
                    the following purposes:
                    <br />
                    <br />
                    Ensuring that content from our site is presented in the most effective manner
                    for you and for your computer
                    <br />
                    <br />
                    Providing customer service and support (including but not limited to customer
                    relationship management, processing and settlement of bills, contacting you
                    regarding your reports and results);
                    <br />
                    <br />
                    Responding to, handling, and processing your enquiries or requests pursuant to
                    your emails, telephone calls, faxes and/or submission of form(s);
                    <br />
                    <br />
                    Responding to and taking follow-up action on feedback or complaints;
                    <br />
                    <br />
                    Providing you with alerts, newsletter, education materials or information that
                    you requested or signed up to
                    <br />
                    <br />
                    Allowing you to participate in interactive features of our service, when you
                    choose to do so;
                    <br />
                    <br />
                    Researching, designing and launching services or products including
                    seminars/events/forums;
                    <br />
                    <br />
                    Designing and conducting surveys/questionnaires for client
                    profiling/segmentation, statistical analysis, improving and furthering the
                    provision our products and services;
                    <br />
                    <br />
                    Troubleshooting crashes associated with specific hardware and software used to
                    access our website;
                    <br />
                    <br />
                    Monitoring and tracking your usage of our website, in order to assist us in
                    understanding user behaviour, trends and preferences;
                    <br />
                    <br />
                    Managing our administrative and business operations, including contracts, and
                    complying with internal policies and procedures; <br />
                    <br />
                    Providing relevant offers and rewards from our Business Partners with whom we
                    may jointly collaborate or whose products or services may be offered on our
                    marketing campaign. If you choose to access these bundled services, we will on
                    occasion share your Personal Information with those business partners.
                    <br />
                    <br />
                    Administering debt recovery and debt management;
                    <br />
                    <br />
                    Complying with any applicable laws, regulations, codes of practice, guidelines,
                    or rules, or to assist in law enforcement and investigations conducted by any
                    governmental and/or regulatory authority; and/or
                    <br />
                    <br />
                    Any other purpose(s) that do not appear above where permissible under any
                    written law, as may be notified by us to you from time to time.
                    <br />
                    <br />
                    We intend to use your data in direct marketing and we require your consent
                    (which includes an indication of no objection) for that purpose. In this
                    connection, please note that:
                    <br />
                    <br />
                    your name, contact details (including address, contact number, email address),
                    products and services information, transaction pattern and behaviour, background
                    and demographic data held by us from time to time may be used by us in direct
                    marketing;
                    <br />
                    <br />
                    the following classes of services, products and subjects may be marketed in
                    direct marketing:
                    <br />
                    <br />
                    a. services and products related to our site and/or our business partners and
                    affiliates (including marketing affiliates programs we are a part of);
                    <br />
                    <br />
                    b. reward, loyalty or privileges programmes, promotional offers and related
                    services; and
                    <br />
                    <br />
                    c. invitations to events such as seminars/webinars/tele-seminars, conferences,
                    live programs or events.
                    <br />
                    <br />
                    We may conduct direct marketing via fax, email, direct mail, telephone and other
                    means of communication or send e-newsletters to you. You may choose not to
                    receive promotional materials, by simply telling us (see below for contact
                    details), and we will cease to do so, without charge.
                    <br />
                    <br />
                    The purposes listed in the above clauses may continue to apply even in
                    situations where your relationship with us (for example, pursuant to a contract)
                    has been terminated or altered in any way, for a reasonable period thereafter
                    (including, where applicable, a period to enable us to enforce our rights under
                    any contract with you).
                    <br />
                    <br />
                    4. DISCLOSURE OF YOUR INFORMATION
                    <br />
                    <br />
                    It may be necessary for us to disclose your Personal Data to our affiliates or
                    to third parties in order to carry out any of the purposes set out above. We do
                    not sell, rent, licence or otherwise disclose your Personal Data to third
                    parties. You hereby authorize us to transfer your Personal Data to such third
                    parties, who will process your Personal Data in accordance with this Privacy
                    Policy. Your Personal Data will not be disclosed to any further parties, unless
                    we have obtained your consent or are legally required to do so.
                    <br />
                    <br />
                    5. COOKIES
                    <br />
                    <br />
                    Our website uses cookies to distinguish you from other users of our website.
                    This helps us to provide you with a good experience when you browse our website
                    and also allows us to improve our site. By continuing to browse the site, you
                    are agreeing to our use of cookies.
                    <br />
                    <br />
                    <br />
                    <br />
                    A cookie is a small file of letters and numbers that we store on your browser or
                    the hard drive of your computer if you agree. Cookies contain information that
                    is transferred to your computer’s hard drive.
                    <br />
                    <br />
                    <br />
                    <br />
                    We use the following cookies:
                    <br />
                    <br />
                    (a) Strictly necessary cookies. These are cookies that are required for the
                    operation of our website. They include, for example, cookies that enable you to
                    log into secure areas of our website, use a shopping cart or make use of
                    e-billing services.
                    <br />
                    <br />
                    (b) Targeting cookies. These cookies record your visit to our website, the pages
                    you have visited and the links you have followed. We will use this information
                    to make our website and the advertising displayed on it more relevant to your
                    interests. We may also share this information with third parties for this
                    purpose.
                    <br />
                    <br />
                    Please note that third parties (including, for example, advertising networks and
                    providers of external services like web traffic analysis services) may also use
                    cookies, over which we have no control. These cookies are likely to be
                    analytical/performance cookies or targeting cookies.
                    <br />
                    <br />
                    Our website uses Google Analytics, a web traffic analysis service provided by
                    Google Inc. (“Google”). Please refer to
                    http://www.google.com/policies/privacy/partners to find out more about how
                    Google uses data when you use our website and how to control the information
                    sent to Google.
                    <br />
                    <br />
                    You block cookies by activating the setting on your browser that allows you to
                    refuse the setting of all or some cookies. However, if you use your browser
                    settings to block all cookies (including essential cookies) you may not be able
                    to access all or parts of our site.
                    <br />
                    <br />
                    Furthermore, you can prevent Google’s collection and processing of data by using
                    the Google Ads Settings page or downloading and installing their browser plug-in
                    (https://tools.google.com/dlpage/gaoptout).
                    <br />
                    <br />
                    6. STORAGE AND TRANSFER OF PERSONAL DATA
                    <br />
                    <br />
                    A. All information you provide to us is stored on our secure servers. Where we
                    have given you (or where you have chosen) a password which enables you to access
                    certain parts of our site, you are responsible for keeping this password
                    confidential. We ask you not to share a password with anyone.
                    <br />
                    <br />
                    B. Pursuant to the purposes and activities as set out herein, it may be
                    necessary for the Personal Data that we collect from you to be transferred to,
                    and stored at, a destination outside Singapore. It may also be processed by
                    staff operating outside Singapore who work for us or for one of our service
                    providers.
                    <br />
                    <br />
                    C. By providing your Personal Data, you agree and consent to the aforesaid
                    transfer, storing and processing, on the understanding that the recipients of
                    such Personal Data will take appropriate steps to ensure that your data is
                    treated securely and continues to receive a standard of protection that is at
                    least comparable to that provided under the PDPA, applicable laws and in
                    accordance with this Privacy Statement.
                    <br />
                    <br />
                    D. Unfortunately, the transmission of information via the internet is not
                    completely secure. Although we will do our best to protect your personal data,
                    we cannot guarantee the security of your data transmitted to our site; any
                    transmission is at your own risk and you agree not to hold us responsible for
                    any breach of security while accessing the internet that is out of our control.
                    Once we have received your information, we will use strict procedures and
                    security features to try to prevent unauthorized access.
                    <br />
                    <br />
                    7. WITHDRAWAL OF CONSENT, ACCESS TO, CORRECTION AND DELETION OF PERSONAL DATA
                    <br />
                    <br />
                    A. You have the right to withdraw consent, request access to, make corrections
                    to, or request deletion of the Personal Data that we hold about you in
                    accordance with applicable laws.
                    <br />
                    <br />
                    B. All requests for withdrawal of consent, access to, correction or deletion of
                    Personal Data held by us shall be made in writing or via email addressed to our
                    Data Protection Officer at: Attention: Lobang App Data Protection Officer;
                    Email: lobangmoxie@gmail.com.
                    <br />
                    <br />
                    C. We may charge a reasonable fee for processing your request for access. If so,
                    we will inform you of the fee before processing your request.
                    <br />
                    <br />
                    D. Please note that if your Personal Data has been provided to us by a third
                    party (for example, a general practitioner) you should contact that organization
                    or individual to make such queries, complaints, and access any correction
                    request to us on your behalf.
                    <br />
                    <br />
                    E. We will respond to your request as soon as reasonably possible. Should we not
                    be able to respond to your request within thirty (30) days after receiving your
                    request, we will inform you in writing within thirty (30) days of the time by
                    which we will be able to respond to your request. If we are unable to provide
                    you with any Personal Data or to make a correction requested by you, we shall
                    generally inform you of the reasons why we are unable to do so (except where we
                    are not required to do so under applicable laws).
                    <br />
                    <br />
                    F. If you withdraw your consent to any or all use of your Personal Data,
                    depending on the nature of your request, we may not be in a position to continue
                    to provide our services to you, or administer any contractual relationship in
                    place, which in turn may result in the termination of any agreements with us.{" "}
                    <br />
                    <br />
                    8. PROTECTION OF PERSONAL DATA
                    <br />
                    <br />
                    A. To safeguard your Personal Data from unauthorised access, collection, use,
                    disclosure, copying, modification, disposal or similar risks, we have introduced
                    appropriate administrative, physical and technical measures such as up-to-date
                    antivirus protection, encryption and the use of privacy filters to secure all
                    storage and transmission of Personal Data by us, and disclosing Personal Data
                    both internally and to our authorised third party service providers and agents
                    only on a need-to-know basis.
                    <br />
                    <br />
                    B. You should be aware, however, that no method of transmission over the
                    Internet or method of electronic storage is completely secure. While security
                    cannot be guaranteed, we strive to protect the security of your information and
                    are constantly reviewing and enhancing our information security measures
                    However, we cannot accept responsibility for misuse or loss of, or unauthorised
                    access to your Personal Data.
                    <br />
                    <br />
                    9. DISCLAIMER
                    <br />
                    <br />
                    To the fullest extent permitted by law, we shall not be liable in any event for
                    any special, exemplary, punitive, indirect, incidental or consequential damages
                    of any kind or for any loss of reputation or goodwill, whether based in
                    contract, tort (including negligence), equity, strict liability, statute or
                    otherwise, suffered as a result of unauthorized or unintended use, access or
                    disclosure of your Personal Data.
                    <br />
                    <br />
                    <br />
                    <br />
                    10. RETENTION OF PERSONAL DATA
                    <br />
                    <br />
                    A. We retain the Personal Data we receive as described in this Privacy Policy
                    for as long as necessary to fulfill the purpose(s) for which it was collected,
                    resolve disputes, conduct audits, pursue legitimate business purposes and comply
                    with applicable laws.
                    <br />
                    <br />
                    B. Whilst we will securely dispose of or anonymise Personal Data which we can
                    reasonably determine is no longer needed and we do not generally hold on to
                    Personal Data.
                    <br />
                    <br />
                    C. We will cease to retain your Personal Data, or remove the means by which the
                    data can be associated with you, as soon as it is reasonable to assume that such
                    retention no longer serves the purpose for which the Personal Data was
                    collected, and is no longer necessary for legal or business purposes.
                    <br />
                    <br />
                    <br />
                    <br />
                    11. THIRD PARTY WEBSITES
                    <br />
                    <br />
                    Our website may, from time to time, contain links to and from third party
                    websites who are not related to Lobang App. If you follow a link to any of these
                    websites, please note that these websites have their own privacy policies and
                    that we do not accept any responsibility or liability for these policies. These
                    links are provided for your information and convenience only and are not an
                    endorsement by Lobang App of the content of such websites or third parties.
                    <br />
                    <br />
                    <br />
                    <br />
                    12. DATA PROTECTION OFFICER
                    <br />
                    <br />
                    A. Any complaints, enquiries or feedback regarding your Personal Data or this
                    Privacy Policy should be addressed to our Data Protection Officer at email:
                    lobangmoxie@gmail.com.
                    <br />
                    <br />
                    All complaints will be evaluated by us in a timely manner. After we have
                    completed our evaluation, our Data Protection Officer (or duly appointed
                    representative) will respond to the person who submitted the complaint or
                    feedback, with the results of the evaluation.
                    <br />
                    <br />
                    We may be prevented by law from complying with any request that you make. We may
                    also decline any request that you may make if the law permits us to do so.
                    <br />
                    <br />
                    <br />
                    <br />
                    13. EFFECT OF PRIVACY POLICY AND CHANGES TO PRIVACY POLICY
                    <br />
                    <br />
                    A. This Privacy Policy applies in conjunction with any other notices,
                    contractual clauses and consent clauses that apply in relation to the
                    collection, use and disclosure of your Personal Data by us.
                    <br />
                    <br />
                    B. We may revise this Privacy Policy from time to time without any prior notice.
                    You may determine if any such revision has taken place by referring to the date
                    on which this Privacy Policy was last updated. Your continued use of our
                    services constitutes your acknowledgement and acceptance of such changes.
                    <br />
                    <br />
                    <br />
                    <br />
                    14. YOUR CONSENT AND RIGHTS
                    <br />
                    <br />
                    By using our service, making an application or visiting our website, you consent
                    to the collection and use of your information and other activities as outlined
                    in this policy.
                    <br />
                    <br />
                    Under the Personal Data Protection Act (the “PDPA“), individuals have the right:
                    (a) to check whether we hold personal data about you and to access such data;
                    (b) to require us to correct as soon as reasonably practicable any data relating
                    to you that is inaccurate; (c) to ascertain our policies and practices in
                    relation to personal data and the kind of personal data held by us; and (d) to
                    object to the use of your personal data for marketing purposes and we shall not
                    use your personal data for marketing purposes after you communicate your
                    objection to us.
                    <br />
                    <br />
                    You may exercise your opt-out right by notifying us if you wish to object to the
                    use of your personal data for direct marketing purposes. Please send requests
                    for such objections, access to data, correction of data, information regarding
                    policies and practices and kinds of data held, questions or complaints to Lobang
                    App Data Protection Officer; Email: lobangmoxie@gmail.com.
                    <br />
                    <br />
                    In accordance with the terms of the PDPA, we have the right to and may charge a
                    minimum fee for processing any data access request.
                    <br />
                    <br />
                    15. GOVERNING LAW AND JURISDICTION
                    <br />
                    <br />
                    Nothing in this Privacy Policy shall limit the rights of the data subject under
                    the PDPA. This Privacy Policy shall be governed by the laws of Singapore. You
                    agree to submit to the exclusive jurisdiction of the Singapore courts.
                    <br />
                    <br />
                    Last updated: 23 September 2022
                    <br />
                    <br />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default PrivacyPolicy;
