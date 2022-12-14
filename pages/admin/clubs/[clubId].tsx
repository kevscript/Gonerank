import ClubForm, { ClubFormInput } from "@/components/forms/ClubForm";
import ShieldIcon from "@/components/Icons/Shield";
import { NextCustomPage } from "@/pages/_app";
import { Club } from "@prisma/client";
import {
  useGetClubsQuery,
  useUpdateClubMutation,
} from "graphql/generated/queryTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type EditClubFormInput = {
  name: string;
  abbreviation: string;
  primary: string;
  secondary: string;
};

const AdminClubEditPage: NextCustomPage = () => {
  const { data, loading, error } = useGetClubsQuery();
  const [club, setClub] = useState<Club | null>(null);
  const router = useRouter();
  const { clubId } = router.query;

  const [updateClub] = useUpdateClubMutation({
    onCompleted: () => router.push("/admin/clubs"),
  });

  const handleUpdateClub = (data: ClubFormInput) => {
    club && updateClub({ variables: { id: club.id, data: data } });
  };

  useEffect(() => {
    const currClub = data?.clubs.find((c) => c.id === clubId);
    currClub && setClub(currClub);
  }, [data, clubId]);

  return (
    <div>
      <div className="flex items-end h-16 p-4 bg-gray-100 dark:bg-dark-400">
        <div className="flex items-center justify-center w-6 h-6 mr-2 overflow-hidden bg-gray-200 rounded-full">
          <ShieldIcon className="w-3 h-3 fill-marine-600" />
        </div>
        <h3>Editer Club</h3>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {club && (
        <div className="p-4">
          <ClubForm
            onSubmit={handleUpdateClub}
            defaultValues={{
              name: club.name,
              abbreviation: club.abbreviation,
              primary: club.primary,
              secondary: club.secondary,
            }}
          />
        </div>
      )}
    </div>
  );
};

AdminClubEditPage.isAdminPage = true;

export default AdminClubEditPage;
