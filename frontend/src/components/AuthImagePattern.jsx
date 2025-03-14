const AuthImagePattern = ({title, subtitle}) => {
    return (
        <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
            <div className="max-w-md text-center">
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[...Array(9)].map((_, i) => (
                        <div 
                            key={i}
                            className={`aspect-square rounded-2xl bg-primary/10 ${
                                i % 2 === 0 ? "animate-pulse" : "" //this is for the animation of every second box
                            }`}
                        />
                    ))}
                </div>
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="text-base-content/60">{subtitle}</p>
            </div>
        </div>
    )
};
//here might changes that give us error that we should use prop type..
//but we are sigma generation and not using them
//so we should go the package.json and remove the prop type


export default AuthImagePattern;
