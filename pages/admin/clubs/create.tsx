import ClubForm, { ClubFormInput } from "@/components/forms/ClubForm";
import ShieldIcon from "@/components/Icons/Shield";
import { NextCustomPage } from "@/pages/_app";
import { useCreateClubMutation } from "graphql/generated/queryTypes";
import { useRouter } from "next/router";

export type CreateClubFormInput = {
  name: string;
  abbreviation: string;
  primary: string;
  secondary: string;
};

const AdminCreateClubPage: NextCustomPage = () => {
  const router = useRouter();

  const handleClubCreation = (data: ClubFormInput) => {
    createClub({ variables: { data: data } });
  };

  const [createClub] = useCreateClubMutation({
    onCompleted: () => router.push("/admin/clubs"),
    refetchQueries: ["GetClubs"],
    awaitRefetchQueries: true,
  });

  return (
    <div className="px-8 py-16 lg:px-16">
      <h3 className="text-xl">Create club</h3>
      <div className="mt-12">
        <ClubForm onSubmit={handleClubCreation} />
      </div>
    </div>
  );
};

AdminCreateClubPage.isAdminPage = true;

export default AdminCreateClubPage;
