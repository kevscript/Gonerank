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
    <>
      <div className="flex items-end bg-gray-100 h-16 p-4">
        <div className="w-6 h-6 rounded-full overflow-hidden flex justify-center items-center bg-gray-200 mr-2">
          <ShieldIcon className="w-3 h-3 fill-marine-600 stroke-marine-600" />
        </div>
        <h3>Nouveau Club</h3>
      </div>
      <div className="p-4">
        <ClubForm onSubmit={handleClubCreation} />
      </div>
    </>
  );
};

AdminCreateClubPage.isAdminPage = true;

export default AdminCreateClubPage;
