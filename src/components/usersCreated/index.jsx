import { isArray } from "lodash";

export const UsersCreated = ({ data = [] }) => {
    return (
        <div className="user-icons">
            {
                isArray(data?.users) && (
                    <div>
                        {
                            data.users.map((itemUser, index) => (
                                <div key={index} >
                                    <img src={itemUser} alt={`users ${index}`} />
                                </div>
                            ))
                        }
                    </div>
                )
            }
            <p>
                {`${data?.count || "243"} users created
                                        resumes today`}
            </p>
        </div>
    )
}