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
        <title>Login | Lobang Dashboard</title>
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
              Term of Use
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
                    Our website shares information about the services provided by Lobang App Pte Ltd
                    and its affiliates(hereafter referred to as “Lobang App”, “us”, “our” or “we”).
                    The download and use of the Application is governed by these terms and
                    conditions (the “Agreement”). It is important that you read carefully and
                    understand the terms and conditions contained or referred below before you
                    request access to or use of Lobang App&apos;s services. The terms and conditions
                    will apply in your relationship with Lobang App in relation to such access and
                    use.If you do not agree to the terms of this Agreement, please do not download
                    or use the Application. <br />
                    <br />
                    Any person (“Applicant”) who requests access to or use of Lobang App services
                    agrees that it does so upon these terms and conditions (as they may be revised
                    by Lobang App from time to time).
                    <br />
                    <br />
                    The Applicant now acknowledges and declares that before making such request, the
                    Applicant had considered and evaluated the responsibilities and risks which may
                    arise in using Lobang App&apos;s services and the Applicant has taken and will
                    continue to take all necessary steps to avoid or reduce any unacceptable
                    responsibilities and risks on its part.
                    <br />
                    <br />
                    The Applicant now also acknowledges and agrees that Lobang App may disclose
                    information relating to the Applicant, to Lobang App and its employees, agents,
                    contractors and its affiliates and with third parties involved in a transaction
                    with Lobang App, as well as to other third parties who perform certain functions
                    on Lobang App&apos;s behalf in the provision, operation and management of Lobang
                    App&apos;s services and to third parties whom Lobang App considers should be
                    provided with such information to prevent contravention of any law or to protect
                    the Lobang App&apos;s services.
                    <br />
                    <br />
                    1. TERMS AND CONDITIONS OF ACCESS TO AND USE OF LOBANG APP’S SERVICES
                    <br />
                    <br />
                    1.1 By downloading and using the Application, you agree to be bound by this
                    Agreement as posted on and accessible through the Application and our website,
                    https://www.lobang app.com. You also agree to be bound by any additional terms
                    and conditions that are referenced herein or that otherwise may apply to the use
                    of the Application.
                    <br />
                    <br />
                    1.2 The Web is an evolving medium. We reserve the right to change or modify the
                    terms and conditions of this Agreement. In the event that we change or modify
                    the terms and conditions of this Agreement, we will publish the revised
                    Agreement on the Application and on our website with the date of last revision
                    duly recorded. You agree to review the latest version of the Agreement each time
                    you use the Application so that you are aware of any changes or modifications.
                    By continuing to use the Application following the date of the latest revision,
                    you agree to be bound by the revised Agreement.
                    <br />
                    <br />
                    2 ELIGIBILITY
                    <br />
                    <br />
                    2.1 Eligibility. To be eligible to register for a customer user account
                    (“Account”) with us, you must:
                    <br />
                    <br />
                    a) be at least 18 years of age and capable of entering into and performing
                    legally binding contracts under applicable law;
                    <br />
                    <br />
                    b) have a mobile device owned and controlled by you and which meets our
                    prevailing specifications for mobile devices; and
                    <br />
                    <br />
                    c) have the Application installed on your mobile device.
                    <br />
                    <br />
                    2.2 If you are under 18 years of age, please do not download or use the
                    Application.
                    <br />
                    <br />
                    2.3 Creating an Account. When registering for an Account, you will be asked to
                    provide us with certain information, including your name, mobile number,
                    address, NRIC or FIN number, and date of birth. Upon successful registration, we
                    will provide you with an Account, accessible to you with a password of your
                    choice.
                    <br />
                    <br />
                    2.4 Your Account enables you to access and use the Application on your mobile
                    device in accordance with this Agreement. You must not transfer or share your
                    Account or password with anyone, or create more than one Account. You are
                    responsible for maintaining the confidentiality of your password and for all
                    activities that occur under your Account. You must not at any time use the
                    Account of any other person. You shall not allow a person under 18 years of age
                    to receive the Services unless they are accompanied by you.
                    <br />
                    <br />
                    2.5 By registering for an Account, you represent, warrant and undertake that all
                    information provided to us is truthful, accurate, up-to-date and complete.
                    <br />
                    <br />
                    2.6 Your failure to maintain accurate, up-to-date and complete information may
                    result in your inability to obtain the Services and/or to access and use your
                    Account and the Application, and our termination of this Agreement with you.
                    <br />
                    <br />
                    3.GRANT OF LICENSE
                    <br />
                    <br />
                    3.1 Subject to your compliance with this Agreement, we grant you a limited,
                    revocable, non-exclusive, non-transferable license to download and install a
                    copy of the Application on a mobile device that you own or control and to run
                    such copy of the Application solely for your own personal use.
                    <br />
                    <br />
                    3.2 You shall not:
                    <br />
                    <br />
                    a) license, sublicense, sell, resell, transfer, assign, distribute or otherwise
                    commercially exploit or make available to any third-party the Application in any
                    way;
                    <br />
                    <br />
                    b) modify, edit, copy, reproduce, create, attempt derive the source code of,
                    decrypt, interfere with, disrupt the integrity or the performance of, or make
                    derivative works based upon the Application;
                    <br />
                    <br />
                    c) reverse engineer or access the Application in order to (i) design or build a
                    competitive product or service, (ii) design or build a product using similar
                    ideas, features, functions or graphics of the Application, or (iii) copy any
                    ideas, features, functions or graphics of the Application;
                    <br />
                    <br />
                    d) rent, lease, loan, resell, sublicense, distribute or otherwise transfer the
                    Application to any third-party or use the Application to provide time sharing or
                    similar services for any third-party;
                    <br />
                    <br />
                    e) delete, alter or obscure the copyright and other proprietary rights notices
                    on the Application;
                    <br />
                    <br />
                    f) violate any applicable laws, rules or regulations in connection with your
                    access or use of the Application;
                    <br />
                    <br />
                    g) use the Application for any purpose for which it was not designed or
                    intended;
                    <br />
                    <br />
                    h) launch an automated program or script or any program which may make multiple
                    server requests per second, or unduly burden or hinder the operation and/or
                    performance of the Application; or
                    <br />
                    <br />
                    i) authorize or encourage any third party to do any of the foregoing.
                    <br />
                    <br />
                    4. USING THE APPLICATION
                    <br />
                    <br />
                    4.1 The Application allows you to create Posts providing business opportunities
                    to the rest of the users in the Lobang App Community and network.
                    <br />
                    <br />
                    4.2 Geo-Location Terms. We make use of certain functionalities provided by
                    third-parties to include maps, geo-coding, places and other content from Google,
                    Inc. (“Google”) as part of the Application (the “Geo-Location Services”). To use
                    the Application, you must allow the Application to use the Global Positioning
                    System receiver installed on your mobile device to detect your location. Your
                    use of Geo-Location Services is subject to Google’s prevailing Google Maps Terms
                    of Use (http://www.google.com/intl/en_us/help/terms_maps.html) and Google’s
                    prevailing privacy policy (http://www.google.com/privacy.html).
                    <br />
                    <br />
                    4.3 Mobile Data. You acknowledge and agree that the use of the Application on
                    your mobile device requires a mobile data plan, and may consume a large amount
                    of data through the mobile data plan. You agree that you are responsible for all
                    mobile data charges you incur through your use of the Application.
                    <br />
                    <br />
                    4.4 Text Messaging. By creating an Account, you agree that we may send you
                    information text messages as part of the normal business operation of your use
                    of the Application and receipt of the Services.
                    <br />
                    <br />
                    4.5 Using the Services. To enable the Service Provider who has accepted your
                    request for Services to locate you, you agree to remain at the location agreed
                    with the Service Provider. You may be asked by the Service Provider to provide
                    proof of identity and other relevant information. You agree to provide full and
                    accurate information to the Service Provider. You acknowledge that the quality
                    of the Services is heavily dependent on the information, which you provide to
                    the Service Provider. You acknowledge and agree that you may be denied the
                    Services if you refuse to provide proof of identity and other requested
                    information to the Service Provider. You retain the right to reject any
                    medication from the Service Provider if the packaging appears tampered with.
                    <br />
                    <br />
                    4.6 By using the Services, you represent, warrant, agree and undertake that:
                    <br />
                    <br />
                    a) you will comply with all applicable laws;
                    <br />
                    <br />
                    b) you will not, in your use of the Services, cause nuisance, annoyance,
                    inconvenience or property damage to the Service Provider or any other party; and
                    <br />
                    <br />
                    c) any complaint that you may have regarding the Services shall be taken up by
                    you with the Service Provider directly.
                    <br />
                    <br />
                    4.7 You acknowledge and accept that the Application is a platform for access to
                    Service Providers and we are not responsible, whether directly or indirectly,
                    for the Services you receive or for the acts or omissions of any Service
                    Provider you engage through the Application. You are solely responsible for any
                    decision or selection made by you in relation to the Service Provider or the
                    Services.
                    <br />
                    <br />
                    4.8 In the event of a dispute between you and the Service Provider, you release
                    us from any and all claims, demands, and damages arising out of or in connection
                    with such disputes.
                    <br />
                    <br />
                    5. FINANCIAL TERMS
                    <br />
                    <br />
                    5.1 Charges. You understand that use of the Application may result in fees to
                    you for the Services you receive from the Service Provider (“Charges”).
                    <br />
                    <br />
                    5.2 Cancellation Fee. You acknowledge and agree that if you elect to cancel
                    requests for the Services, we may charge you a cancellation fee which will vary
                    according to the nature of Service you may have requested.
                    <br />
                    <br />
                    5.3 Payment. After you have received the Services through your use of the
                    Application, you may choose to pay for the Services by cash, or credit/debit
                    card (“Card”) using Stripe. If you choose to pay for the Services by card using
                    Stripe, you:
                    <br />
                    <br />
                    a) will need to register a valid Card which belongs to you in accordance with
                    the instructions within the Application. If you register a Card, you agree that
                    we may verify and authorise your Card details when you first register the Card
                    with us and when you use the Application;
                    <br />
                    <br />
                    b) appoint us as your limited payment collection agent solely for the purpose of
                    accepting the Charges and agree that payment made to us shall be considered the
                    same as payment made directly by you to the Service Provider.
                    <br />
                    <br />
                    5.4 Invoices will be sent to the email address registered on the Application
                    after every visit or transaction.
                    <br />
                    <br />
                    5.5 Charges paid by you are final and non-refundable, unless otherwise
                    determined by us. If payment has been made through Card or Stripe, we will send
                    you a receipt by email.
                    <br />
                    <br />
                    5.6 Third Party Payment Processors. Payment processing services for doctors on
                    Lobang App are provided by Stripe and are subject to the Stripe Connected
                    Account Agreement, which includes the Stripe Terms of Service (collectively, the
                    “Stripe Services Agreement”). By agreeing to these terms or continuing to
                    operate as a doctor on Lobang App, you agree to be bound by the Stripe Services
                    Agreement, as the same may be modified by Stripe from time to time. As a
                    condition of Lobang App enabling payment processing services through Stripe, you
                    agree to provide Lobang App accurate and complete information about you and your
                    business, and you authorize Lobang App to share it and transaction information
                    related to your use of the payment processing services provided by Stripe.
                    <br />
                    <br />
                    6. PERSONAL DATA PROTECTION
                    <br />
                    <br />
                    6.1 By using the Application and providing personal information to us, you agree
                    that we may collect, use, process and disclose such personal information in
                    accordance with the provisions of this Section 6. <br />
                    <br />
                    6.2 You may review and update your personal information within the Application
                    by opening the Application and visiting the “Settings” page for your Account.
                    <br />
                    <br />
                    6.3 You are under no obligation to provide personal information to us. However,
                    if you choose to withhold the requested personal information, you may not be
                    able to use certain aspects of the Application and you may not be able to
                    receive the Services.
                    <br />
                    <br />
                    6.4 We use the personal information you provide to:
                    <br />
                    <br />
                    (a) deliver the Application and to enable us to provide you with the produces,
                    services and information offered through the Application which you request;
                    <br />
                    <br />
                    (b) enable Service Providers to provide the Services;
                    <br />
                    <br />
                    (c) administer your Account and communicate with you;
                    <br />
                    <br />
                    (d) verify and carry out payments which you make through the Application;
                    <br />
                    <br />
                    (e) improve the Application and customise the content shown to you;
                    <br />
                    <br />
                    (f) develop, operate, improve, deliver and maintain our products and services;
                    <br />
                    <br />
                    (g) send you information which you may find useful or which you have requested
                    from us, provided you have indicated that you do not object to being contacted
                    for such purposes;
                    <br />
                    <br />
                    (h) enforce this Agreement and other policies;
                    <br />
                    <br />
                    (i) perform functions or services as otherwise described to you at the time of
                    collection.
                    <br />
                    <br />
                    6.5 We may share your personal information with:
                    <br />
                    <br />
                    (a) Service Providers who may view certain information about you through the
                    Application;
                    <br />
                    <br />
                    (b) our affiliates and third party service providers who assist us in providing
                    the Application and who perform certain functions on our behalf;
                    <br />
                    <br />
                    (c) parties involved in a transaction involving the purchase, sale, lease,
                    merger or amalgamation or any other acquisition, disposal, or financing of our
                    business or a portion of our business;
                    <br />
                    <br />
                    (d) other parties if required to do so by law or if we believe that such
                    disclosure is necessary to prevent fraud or crime or to protect the application
                    or the rights, property or personal safety of any person.
                    <br />
                    <br />
                    6.6 We have reasonable security measures in place to protect against the loss,
                    misuse and alteration of personal information under our control. While we will
                    use all reasonable efforts to prevent the loss, misuse or alteration of your
                    personal information, you should bear in mind that submissions of information
                    over the Internet are never entirely secure. We cannot guarantee the security of
                    the personal information which you submit through the Application while it is in
                    transit over the internet and any such submission is at your own risk.
                    <br />
                    <br />
                    6.7 Linkage to Third Party Website, Application and/or Platform
                    <br />
                    <br />
                    Each Applicant acknowledges and agrees that Lobang App may at its discretion,
                    link Lobang App&apos;s services to any website, application or platform of any
                    third party or allow any third party to advertise or provide its goods, services
                    and facilities, subject to the terms and conditions set by Lobang App or imposed
                    by the third party which may not be within Lobang App’s control. The Applicant
                    whose request for access to and use of Lobang App&apos;s services is acceded to
                    by Lobang App (“User”) shall, unless expressly agreed otherwise between Lobang
                    App and the User then be free to make its own independent decision on whether to
                    use Lobang App&apos;s services or such other website, application or platform or
                    such third party’s website, application or platform to acquire any goods,
                    services or facilities from such third party. If the User decides to do so, the
                    User shall be deemed to deal with such third party relating to such goods,
                    services and facilities at the User’s own risk and expense. The Applicant and
                    the User (as the case may be) further agrees that in case of any contradiction
                    or inconsistency between these terms and conditions and the terms and conditions
                    imposed by such third party, these terms and conditions shall apply unless and
                    to the extent Lobang App decides otherwise.
                    <br />
                    <br />
                    6.8 If you have any questions or comments on our personal data protection
                    practices, please contact us by email at lobangmoxie@gmail.com
                    <br />
                    <br />
                    7.CONFIDENTIALITY
                    <br />
                    <br />
                    7.1 You shall keep confidential all information and materials about the
                    Application, and all information of a secret, confidential or proprietary nature
                    concerning our business or affairs and which is not otherwise in the public
                    domain that may come into your knowledge or possession as a result of
                    communications between you and us or the performance of this Agreement
                    (“Confidential Information”).
                    <br />
                    <br />
                    7.2 In the event that we discover that you have made or intend to make or cause
                    to be made any unauthorized disclosure of the Confidential Information, we shall
                    be entitled to take out an injunction against you to restrain you from making
                    any such disclosure. In addition or in the alternative, as the case may be, we
                    shall be entitled to exercise such legal and equitable remedies as are available
                    in respect of the breach of this Agreement and to further protect the
                    Confidential Information.
                    <br />
                    <br />
                    8. INTELLECTUAL PROPERTY
                    <br />
                    <br />
                    8.1 Rights to Application. You acknowledge and agree that the Application and
                    all copyright, patents, trademarks, trade secrets and other intellectual
                    property rights associated therewith are, and shall remain, the property of
                    Lobang App. Furthermore, you acknowledge and agree that the source and object
                    code of the Application and the format, directories, queries, algorithms,
                    structure and organization of the Application are the intellectual property and
                    proprietary and confidential information of Lobang App and its affiliates,
                    licensors and suppliers. You are not granted any intellectual property rights in
                    and to the Application not expressly granted in this Agreement and such rights
                    are hereby reserved and retained by Lobang App.
                    <br />
                    <br />
                    8.2 Third Party Content. The Application may utilize or include third party
                    content and software (“Third Party Content”) that is subject to open source and
                    third party terms of service. You acknowledge and agree that your right to use
                    such Third Party Content as part of the Application is subject to and governed
                    by the terms and conditions of the open source and third party terms of service
                    applicable to such Third Party Content, including, without limitation, any
                    applicable acknowledgements, licence terms and disclaimers contained therein. In
                    the event of a conflict between the terms of this Agreement and the terms of
                    such open source or third party terms of service, the terms of the open source
                    or third party terms of service shall prevail with regard to your use of the
                    relevant Third Party Content. In no event shall the Application or components
                    thereof be deemed to be open source or publicly available software.
                    <br />
                    <br />
                    8.3 Company’s Marks. You are not authorized by Lobang App to use Lobang App’s
                    trademarks in any advertising, publicity or in any other commercial manner
                    without the prior written consent of Lobang App, which may be withheld for any
                    or no reason.
                    <br />
                    <br />
                    8.4 Infringement Acknowledgement. You acknowledge and agree that in the event of
                    a third party claim against you that the Application or your possession or use
                    of the Application infringes any third party’s intellectual property rights, you
                    (and not Lobang App) will be responsible for the investigation, defence,
                    settlement and discharge of any such claim of intellectual property
                    infringement. You will, however, promptly notify Lobang App in writing of such a
                    claim.
                    <br />
                    <br />
                    9. USER&apos;S MATERIALS
                    <br />
                    <br />
                    The User hereby represents and warrants to Lobang App that it does and shall
                    possess all intellectual property and other rights to use, disclose, reproduce
                    and publish all content and other materials (including photographs, videos and
                    music) posted or otherwise it makes available to Lobang App or on the Website,
                    the App and/or the Platform (“the User’s Materials”).
                    <br />
                    <br />
                    The User:
                    <br />
                    <br />
                    Hereby grants to Lobang App full right, permission and liberty to use, reproduce
                    and transmit the User’s Materials and without royalty or other charge; Hereby
                    acknowledges that the User’s Materials will be made available to the employees,
                    agents and contractors of Lobang App in relation to Lobang App&apos;s services,
                    and Lobang App may not be able to monitor or limit or otherwise control their
                    use of the User’s Materials;
                    <br />
                    <br />
                    Hereby releases Lobang App and its employees, agents and contractors from any
                    liability for their use of the User’s Materials; and
                    <br />
                    <br />
                    Hereby acknowledges and agrees that its use (if any) of any sharing function on
                    the Website, the App and/or the Platform to share content to Facebook, Google,
                    LinkedIn or other services will be subject to the service provider’s terms of
                    service.
                    <br />
                    <br />
                    10. THIRD PARTY ADVERTISING, MARKETING AND PROMOTION
                    <br />
                    <br />
                    If Lobang App permits third parties to advertise, market or promote their
                    services or goods through the Website, the App and/or the Platform but the User
                    does not wish to receive or participate in such advertising, marketing or
                    promotion:
                    <br />
                    <br />
                    The User shall notify Lobang App in in writing immediately or within the time
                    (if any) specified by Lobang App; and
                    <br />
                    <br />
                    Lobang App may require the User to pay a charge (if any) specified by Lobang App
                    from time to time or may terminate the User’s access to or use of Lobang
                    App&apos;s services.
                    <br />
                    <br />
                    11. FORCE MAJEURE
                    <br />
                    <br />
                    Lobang App shall not be liable for any failure to perform its obligations under
                    these terms and conditions if the failure results from an event which is beyond
                    the reasonable control of Lobang App and which results in Lobang App being
                    unable to observe or perform on time its obligation.
                    <br />
                    <br />
                    <br />
                    <br />
                    12. ASSIGNMENT AND THIRD PARTIES
                    <br />
                    <br />
                    The Applicant and the User shall not but Lobang App may assign, transfer,
                    sub-contract or delegate any of its rights, benefits, duties or obligations
                    arising under these terms and conditions without the prior written consent of
                    the Applicant or the User. A person who is not a party to these terms and
                    conditions shall have no right under the Contracts (Rights of Third Parties) Act
                    (Chap 53B) to enforce any provision of the Act.
                    <br />
                    <br />
                    <br />
                    <br />
                    13. INVALIDITY OR UNENFORCEABILITY
                    <br />
                    <br />
                    If any of these terms and conditions is found to be invalid or unenforceable for
                    any reason or to any extent, such invalidity or enforceability shall not in any
                    manner affect or render invalid or unenforceable the remaining terms and
                    conditions.
                    <br />
                    <br />
                    14. DISCLAIMER
                    <br />
                    <br />
                    14.1 We make no representation, warranty or guarantee as to the reliability,
                    timeliness, quality, suitability, availability, accuracy of the Application. The
                    Application and any information contained in or provided through the Application
                    are provided on an “as is” and “as available” basis.
                    <br />
                    <br />
                    14.2 We do not represent or warrant that:
                    <br />
                    <br />
                    (a) the use of the Application will be secure, timely, uninterrupted or error
                    free or operate in combination with any other hardware, software, system or
                    data;
                    <br />
                    <br />
                    (b) the Application will meet your requirements or expectations;
                    <br />
                    <br />
                    (c) the Services which you received form a Service Provider would meet your
                    personal requirements;
                    <br />
                    <br />
                    (d) the quality of, information or other materials obtained by you through the
                    Application will meet your requirements or expectations;
                    <br />
                    <br />
                    (e) any stored data will be accurate or reliable;
                    <br />
                    <br />
                    (f) errors or defects in the Application will be corrected; or
                    <br />
                    <br />
                    (g) the Application or our servers are free of viruses or other harmful
                    components.
                    <br />
                    <br />
                    14.3 All conditions, representations, and warranties, whether express, implied,
                    statutory or otherwise, including, without limitation, any implied warranties of
                    merchantability, fitness for a particular purpose, and non-infringement, are
                    hereby excluded and disclaimed to the fullest extent.
                    <br />
                    <br />
                    14.4 Your use of and reliance upon the Application and any information contained
                    in or provided through the Application is at your sole risk and discretion.
                    <br />
                    <br />
                    14.5 The Application may be subject to limitations, delays, and other problems
                    inherent in the use of the Internet and electronic communications (including
                    problems inherent to the mobile device you use). We are not responsible for any
                    delays, delivery failures, damages, or losses resulting from such problems.
                    <br />
                    <br />
                    <br />
                    <br />
                    15. LIMITATION OF LIABILITY
                    <br />
                    <br />
                    15.1 To the fullest extent permissible under applicable law, in no event shall
                    Lobang App be liable to you or any third party for any direct, indirect,
                    punitive, exemplary, incidental, special or consequential damages (whether in
                    contract, tort, or otherwise) arising out of or in connection with this
                    Agreement, including, but not limited to, any loss of use, loss of data,
                    business interruption, loss of income or profits, irrespective of whether it had
                    advance notice of the possibility of any such damages.
                    <br />
                    <br />
                    15.2 Without limiting the generality of the foregoing, the maximum liability of
                    Lobang App for all claims of every kind arising out of this Agreement will not
                    exceed SGD1.00.
                    <br />
                    <br />
                    16. INDEMNIFICATION
                    <br />
                    <br />
                    16.1 You agree to indemnify, defend, and hold harmless Lobang App, its officers,
                    directors, employees, managers, shareholders, agents, representatives,
                    subsidiaries, affiliates, suppliers, and licensors from, and against, any
                    claims, proceedings, losses, expenses, damages and costs, including legal fees,
                    arising out of or in connection with:
                    <br />
                    <br />
                    (a) your access and use of the Application;
                    <br />
                    <br />
                    (b) use of your Account other than in accordance with this Agreement;
                    <br />
                    <br />
                    (c) your use of the Services;
                    <br />
                    <br />
                    (d) your dealings with the Service Provider;
                    <br />
                    <br />
                    (e) your breach of this Agreement;
                    <br />
                    <br />
                    (f) your violation of law;
                    <br />
                    <br />
                    (g) your negligence or willful misconduct;
                    <br />
                    <br />
                    (h) your violation of the rights of a third party, including the infringement by
                    you of any intellectual property or misappropriation of any proprietary right or
                    trade secret of any person or entity.
                    <br />
                    <br />
                    <br />
                    <br />
                    17. MODIFICATIONS TO, OR DISCONTINUATION OF, THE APPLICATION
                    <br />
                    <br />
                    <br />
                    <br />
                    17.1 We reserve the right at any time and from time to time to modify, suspend
                    or discontinue, temporarily or permanently the Application or any part thereof,
                    with or without notice. You agree that we will not be liable to you or any
                    third-party for any modification, suspension or discontinuance of the
                    Application or any portion thereof.
                    <br />
                    <br />
                    18 TERMINATION
                    <br />
                    <br />
                    18.1 This Agreement shall commence on the date that it is accepted by you and
                    shall continue until terminated.
                    <br />
                    <br />
                    18.2 We may terminate this Agreement immediately, without prior notice, if you
                    fail to comply with any of the terms and conditions stipulated in this
                    Agreement.
                    <br />
                    <br />
                    18.3 Notwithstanding the foregoing, we may terminate this Agreement and your use
                    of the Application, or generally cease offering or deny access to the
                    Application or any part thereof, at any time for no reason with or without
                    notice.
                    <br />
                    <br />
                    18.4 Upon termination of this Agreement, the following shall apply:
                    <br />
                    <br />
                    a) you shall immediately settle all sum due and payable to us under this
                    Agreement up to the date of termination of this Agreement; and
                    <br />
                    <br />
                    b) you shall cease all use of the Application and delete and fully remove the
                    Application from your mobile device.
                    <br />
                    <br />
                    18.5 The expiration or termination of this Agreement shall be without prejudice
                    to any other rights or remedies which either party may be entitled to hereunder
                    or at law and shall not affect any accrued rights or liabilities of either party
                    nor the coming into or continuance in force of any provision which is expressly
                    or by implication intended to come into or continue in force on or after such
                    expiration or termination. Without prejudice to the foregoing, Clauses 7
                    (Confidentiality), 8 (Intellectual Property), 9 (Disclaimers), 10 (Limitation of
                    Liability) and 11 (Indemnification) shall survive the expiration or termination
                    of this Agreement.
                    <br />
                    <br />
                    19 MISCELLANEOUS
                    <br />
                    <br />
                    19.1 Relationship. The parties hereto are independent contractors. Nothing in
                    this Agreement shall operate to constitute a party an agent, partner, employee
                    or representative of the other party. A party shall not hold itself out as such
                    nor as having any power or authority to incur any obligation of any nature
                    expressed or implied of the other party nor shall a party pledge the credit of
                    the other party.
                    <br />
                    <br />
                    <br />
                    <br />
                    19.2 Entire Agreement. This Agreement constitutes the entire agreement between
                    Lobang App and you with respect to the subject matter contained in this
                    Agreement and supersedes all previous and contemporaneous agreements, proposals
                    and communications, written or oral, related to that subject matter.
                    <br />
                    <br />
                    <br />
                    <br />
                    19.3 Rights of Third Parties. This Agreement is not intended to benefit any
                    third party, and does not create any third party beneficiaries. Accordingly,
                    this Agreement may only be invoked or enforced by Lobang App or you.
                    <br />
                    <br />
                    19.4 Nature of Terms. If any provision of this Agreement is found to be
                    unlawful, void, or for any reason unenforceable, this will not affect the
                    legality, validity and enforceability of any remaining provisions.
                    <br />
                    <br />
                    19.5 Waiver. Except as provided herein, the failure to exercise a right or
                    require performance of an obligation in this Agreement shall not affect a
                    party’s ability to exercise such right or require such performance at any time
                    thereafter nor shall the waiver of a breach of this Agreement constitute a
                    waiver of any subsequent breach.
                    <br />
                    <br />
                    19.6 Assignment. Neither party shall not assign its rights or obligations under
                    this Agreement without prior written consent of the other party, provided that
                    Lobang App may assign or transfer this Agreement or any or all of its rights and
                    obligations under this Agreement without consent to an affiliate of Lobang App
                    or to an acquirer of all or substantially all of Lobang App’s business, equity
                    or assets.
                    <br />
                    <br />
                    20. GOVERNING LAW AND JURISDICTION
                    <br />
                    <br />
                    Lobang App and the user will endeavor to resolve any dispute between them
                    arising out of or in connection with these terms and conditions and/or any
                    related agreements through friendly consultation. If no mutually satisfactory
                    resolution can be reached within reasonable time, this Agreement shall be
                    governed by Singapore law, without regard to excluding its conflicts of law
                    principles. Any disputes, actions, claims or causes of action arising out of or
                    in connection with this Agreement shall be subject to the exclusive jurisdiction
                    of the courts of Singapore.
                    <br />
                    <br />
                    <br />
                    <br />
                    Last updated: 25 January 2022
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
