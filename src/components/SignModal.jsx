import { LinkIcon } from '@heroicons/react/24/outline'
import SimpleModal from './Modals/SimpleModal'
import Form from './Forms/Form'
import Text from './Forms/Text'
import Password from './Forms/Password'

export default function SignModal(prop) {
  const formulaire =
    <Form>
      <Text label="Username" id="uname" placeholder="JeanDupond" />
      <Password label="Password" id="password" placeholder="*******" />
    </Form>;
  return (
    <SimpleModal openState={false} logo={LinkIcon} title="Login" content={formulaire} bOk="Login" bCancel="Cancel" color="primary" openButton={prop.openButton}/>
  )
}
