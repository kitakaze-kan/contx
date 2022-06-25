import { UserContainer } from '@/components/container/user';
import { isDIDstring } from '@glazed/did-datastore';
import type { NextPage } from 'next'
import type { GetServerSideProps } from "next";

type Props = {
    did: string
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const did = ctx.params?.did as string | null | undefined

  if (did == null) {
    return {
      redirect: { destination: "/", permanent: true },
    };
  }

  if (isDIDstring(did)) {
    return {
      props: { did },
    };
  } else {
    return {
        redirect: { destination: "/", permanent: true },
      };
  }
};

const UserPage: NextPage<Props> = ({did}) => {
  
  return (
    <UserContainer did={did} />
  )
}


export default UserPage
